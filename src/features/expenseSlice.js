import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
    expense: []
}

const expenseSlice = createSlice({
    name: 'crud',
    initialState,
    reducers: {
        addExpense: (state, action) => {
            const {text, cost} = action.payload
            const exp = {
                id: nanoid(),
                text,
                cost,
            }
            state.expense.push(exp)
        },

        removeExpense: (state, action) => {
            state.expense = state.expense.filter((exp) => exp.id !== action.payload)
        },
        
        updateExpense: (state, action) => {
            const {id, cost} = action.payload
            const prev = state.expense.find(item => item.id === id)
            if(prev) {
                prev.cost = cost
            }
        }
    }
})

export const {addExpense, removeExpense, updateExpense} = expenseSlice.actions
export default expenseSlice.reducer