import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    expense: []
}

const expenseSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {
        
    }
})

export const {addExpense, removeExpense, updateExpense} = expenseSlice.actions
export default expenseSlice.reducer