import serverFetch from "@/lib/serverFetch";
import { convertToUrlParams } from "@/lib/stringUtils";
import { PaginatedDocument } from "@/model";
import { AppUser, CreateUserDto, UpdateUserDto } from "@/model/user";
import { QueryParams } from "@/types";

const BASE_URL = '/users'

class UsersService {

  create = async (userDto: CreateUserDto) => {
    const createdUser = await serverFetch.post<AppUser>(BASE_URL, userDto)
  
    return createdUser
  }
  
  findOne = async (id: string) => {
    const { data: user } = await serverFetch.get<AppUser>(`${BASE_URL}/${id}`)
    
    return user
  }
  
  findAll = async (queryParams: QueryParams) => {
    const { data } = await serverFetch.get<PaginatedDocument<AppUser>>(`${BASE_URL}?${convertToUrlParams(queryParams)}`)

    return data
  }
  
  update = async (id: string, userDto: UpdateUserDto) => {
    const { data: user } = await serverFetch.put<AppUser>(`${BASE_URL}/${id}`, userDto)
    return user
  }
  
  delete = async (id: string) => {
   await serverFetch.delete(`${BASE_URL}/${id}`)
  }
}

export const userService = new UsersService()
