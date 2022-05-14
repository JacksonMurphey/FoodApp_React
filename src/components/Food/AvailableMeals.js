import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import useHttp from '../hooks/use-http'

const AvailableMeals = () => {

    const [meals, setMeals] = useState([])
    const httpData = useHttp()
    const { isLoading, error, sendRequest: fetchMeals } = httpData

    useEffect(() => {
        const transformMeals = (mealObj) => {
            const loadedMeals = []
            for (const mealKey in mealObj) {
                loadedMeals.push({
                    id: mealKey,
                    name: mealObj[mealKey].name,
                    description: mealObj[mealKey].description,
                    price: mealObj[mealKey].price
                })
            }
            setMeals(loadedMeals)
        }
        fetchMeals({ url: "https://react-http-b49ca-default-rtdb.firebaseio.com/meals.json" }, transformMeals)
    }, [fetchMeals])


    if (isLoading) {
        return (<section className={classes.MealsLoading}>
            <p>Loading...</p>
        </section>)
    }
    if (error) {
        return (
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        )
    }

    const mealList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ))

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    )
}
export default AvailableMeals
