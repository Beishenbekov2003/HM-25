import { styled } from '@mui/material/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMeals } from '../../store/meals/meals-thunk'
// import { getMeals } from '../../store/meals/meals-thunk'
import MealItem from './meal-Item/MealItem'

export const Meals = () => {
    const { maels, error, isLoading } = useSelector((state) => state.meals)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMeals())
    }, [dispatch])

    return (
        <Card>
            {isLoading && !error && <p>loading......</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {maels.map((meal) => {
                // eslint-disable-next-line no-underscore-dangle
                return <MealItem meal={meal} key={meal._id} />
            })}
        </Card>
    )
}

const Card = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '16px',
    width: '75%',
    padding: '40px 40px 36px 40px',
    margin: '40px auto',
    color: theme.palette.primary.constrastText,
}))
