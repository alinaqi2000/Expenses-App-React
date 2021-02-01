import React from 'react';
import { Chart } from '../models/Chart';
import { Item } from '../models/Item';
import { User } from '../models/User';

import { ApiResponse } from './ItemProvider';

export interface ItemCtx {
    theme: any,
    setTheme: (theme: any) => void,
    user: User,
    setUser: (user: User) => void,
    token: string,
    setToken: (token: string) => void,
    checkAuth: () => boolean,
    isAuth: boolean,
    items: Item[],
    fetchItems: () => void,
    currentIndex: number,
    currentItem: Item,
    handleInputChange: (key: string, value: string | Date | null) => void,
    setItem: (item: Item, index: number) => void,
    addItem: (item: Item) => ApiResponse | any,
    deleteItem: (index: number) => ApiResponse | any,
    dialogOpen: boolean,
    toggleDialog: () => void,
    chartData: Chart,
    fetchChartData: () => void,
}
export const initialContext: ItemCtx = {
    theme: "light",
    setTheme: () => { },
    user: new User(),
    setUser: () => { },
    token: "",
    setToken: () => { },
    checkAuth: () => false,
    isAuth: false,
    items: [],
    fetchItems: () => { },
    currentIndex: - 1,
    currentItem: new Item("", "", "", "", new Date('2021-01-30T21:11:54')),
    handleInputChange: () => { },
    setItem: () => { },
    addItem: () => { },
    deleteItem: () => { },
    dialogOpen: false,
    toggleDialog: () => { },
    chartData: new Chart([], []),
    fetchChartData: () => { },
}
const ItemContext = React.createContext(initialContext);

export default ItemContext;