"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSalon } from "../../services/salonService";
import { getCityDetail } from "../../services/cityService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const salonSchema = z.object({
  name: z.string(),
  placename: z.string(),
});

type FormData = z.infer<typeof salonSchema> & {
  longitude?: number;
  latitude?: number;
};

interface CityDetail {
  cityname: string;
  longitude: number;
  latitude: number;
}

const CreateSalonPage = () => {
  const navigate = useNavigate();
  const form = useForm<FormData>({
    resolver: zodResolver(salonSchema),
    defaultValues: {
      name: "",
      placename: "",
    },
  });

  const { handleSubmit, control, setValue } = form;
  const [citySuggestions, setCitySuggestions] = useState<CityDetail[]>([]);

  const handlePlacenameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setValue("placename", value);

    if (value.length > 0) {
      const cityDetail: CityDetail[] = await getCityDetail(value);
      console.log("City Details Fetched:", cityDetail);
      if (cityDetail) {
        
        setCitySuggestions(cityDetail);
      } else {
        setCitySuggestions([]);
      }
    } else {
      setCitySuggestions([]);
    }
  };
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { name, placename } = data;
    const selectedCity = citySuggestions.find(
      (city) => city.cityname === placename
    );

    if (selectedCity) {
      const input = {
        name,
        placename,
        longitude: selectedCity.longitude,
        latitude: selectedCity.latitude,
      };

      try {
        const newSalon = await createSalon(input);
        if(newSalon){
            toast.success("salon created successfully");
            navigate("/owner-dashboard");
        }
      } catch (error) {
        toast.error("Error creating salon:");
        console.error("Error creating salon:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create New Salon</h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Salon Name */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salon Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Salon Name" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Place Name */}
            <FormField
              control={control}
              name="placename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Place Name"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handlePlacenameChange(e);
                      }}
                      required
                    />
                  </FormControl>
                  {citySuggestions.length > 0 && (
                    <Select
                      onValueChange={(value) => {
                        const selectedCity = citySuggestions.find(
                          (city) => city.cityname === value
                        );
                        if (selectedCity) {
                          setValue("placename", selectedCity.cityname);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="choose from option" />
                      </SelectTrigger>
                      <SelectContent>
                        {citySuggestions.map((city) => (
                          <SelectItem key={city.cityname} value={city.cityname}>
                            {city.cityname}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="bg-blue-500 text-white">
              Create Salon
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { CreateSalonPage };
