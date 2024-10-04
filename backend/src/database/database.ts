import { Transaction } from "sequelize"

export interface DbOptions {
  database: string
  username: string
  password: string
  poolLimit?: number
  host: string

}

export interface Database {
  /**
   *
   * @param options - The Db options to connect to the URL or the connection URL
   * @description - Create and intialize the instance for database
   */
  initInstance(options: DbOptions | string): Promise<void>
  /**
   * Close the current connection and open a new instance
   */
  refresh(): Promise<void>
  getInstance(): any
  performTransaction(transaction: (t: Transaction) => Promise<any>): Promise<any>
}