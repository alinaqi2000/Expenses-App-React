import axios, { AxiosResponse } from 'axios';
import React, { Component } from 'react';
import { Chart } from '../models/Chart';
import { Item } from '../models/Item';
import { User } from '../models/User';
import ItemContext, { ItemCtx, initialContext } from './ItemContext';

export interface ApiResponse {
    status: any
    message?: string
    success?: any
}
// export const BASE_URL = "http://localhost:4001/api/v2/";
export const BASE_URL = "https://expesnse-app-express-api.vercel.app/api/v2/";
export class ItemProvider extends Component {
    state: ItemCtx = initialContext
    render() {
        return (
            <ItemContext.Provider
                value={{
                    ...this.state,
                    setUser: (user: User) => {
                        this.setState({ user })
                    },
                    setTheme: (theme: any) => {
                        this.setState({ theme })
                        localStorage.setItem("appTheme", theme);

                    },
                    setToken: (token: string) => {
                        this.setState({ token, isAuth: token !== "" })
                        localStorage.setItem("authToken", token);
                    },
                    fetchChartData: async () => {
                        const token = localStorage.getItem("authToken")
                        const resp = await axios.get<ApiResponse>(`${BASE_URL}items/chart?token=${token}`)
                        resp.data.status && this.setState({ chartData: resp.data.success })
                    },
                    fetchItems: () => {
                        axios.get<ApiResponse>(`${BASE_URL}items?token=${this.state.token}`).then(resp => {
                            if (resp.data.status)
                                this.setState({ items: resp.data.success })
                        })
                    },
                    handleInputChange: (key: string, value: string | Date | null) => {
                        this.setState({
                            currentItem: {
                                ...this.state.currentItem,
                                [key]: value
                            }
                        })
                    },
                    setItem: (currentItem: Item, currentIndex: number) => {
                        this.setState({ currentItem, currentIndex, dialogOpen: true })
                    },
                    addItem: async (item: Item) => {
                        if (this.state.currentIndex === -1) {
                            this.setState({ items: [...this.state.items, item], currentItem: initialContext.currentItem, dialogOpen: false })
                          
                            const resp: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(`${BASE_URL}items?token=${this.state.token}`, { ...item });
                            const new_items = this.state.items
                            new_items[this.state.items.length - 1]._id = resp.data.status
                            this.setState({
                                items: [...new_items],
                            })
                            return resp.data

                        } else {
                            const new_items = this.state.items
                            new_items[this.state.currentIndex] = item
                            this.setState({
                                items: [...new_items],
                                currentIndex: -1,
                                currentItem: initialContext.currentItem,
                                dialogOpen: false
                            })
                            const resp_1: AxiosResponse<ApiResponse> = await axios.put<ApiResponse>(`${BASE_URL}items/${item._id}?token=${this.state.token}`, { ...item });
                            return resp_1.data
                        }
                    },
                    deleteItem: async (index: number) => {
                        const new_items = this.state.items
                        const id = new_items[index]._id
                        new_items.splice(index, 1)
                        this.setState({
                            items: [...new_items]
                        })
                        const resp = await axios.delete<ApiResponse>(`${BASE_URL}items/${id}?token=${this.state.token}`);
                        return resp.data;
                    },
                    toggleDialog: () => {
                        if (this.state.dialogOpen)
                            this.setState({
                                currentIndex: -1,
                                currentItem: initialContext.currentItem,
                                dialogOpen: false
                            })
                        else
                            this.setState({ dialogOpen: true })
                    }
                }}
            >
                {this.props.children}
            </ItemContext.Provider>
        );
    }
}