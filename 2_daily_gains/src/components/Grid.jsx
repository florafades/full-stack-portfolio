import { useState, useEffect } from 'react';
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard'

export default function Grid() {
    const [savedWorkouts, setSavedWorkouts] = useState(null);
    // [a , setA] = useState(null) initializes a=null and creates function setA()
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    //create an array listing only workouts where isComplete = TRUE  (.filter)
    //the array includes the indexes for each
    //Object.keys gets the KEY of each item in savedWorkouts
    //savedWorkouts contains the full object of workouts that have been saved so far
    //has nested keyvalue pairs
    //each key is a number string pertaining to the index '0' '1' '2'
    //therefore as it runs, with each iteration, val='0' , '1', '2', etc
    //in localStorage
    //Object.keys(objectA).filter((x) => {y}) --> see section in google doc
    //after it runs, we have an array of each KEY of each workout day that is complete
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        // val is the index
        const entry = savedWorkouts[val]
        //eg if savedWorkouts('0').isComplete = TRUE
        return entry.isComplete
    }) 
    

    function handleSave(index, data) {
        //save to local computer storage and mod saved workouts state
        const newObj = {
            ...savedWorkouts,
            // [dynamickey]:{object}
            [index]: {
                ...data,
                isComplete: !!data.isComplete || 
                !!savedWorkouts?.[index]?.isComplete
            }
        }

        setSavedWorkouts(newObj)
        localStorage.setItem('dailygains', JSON.stringify(newObj))
        //Exit
        setSelectedWorkout(null)
    }

    function handleComplete(index, data) {
        // complete a workout(modify the completed status)
        const newObj = { ...data }
        // tracks whether or not the workout is complete
        newObj.isComplete = true
        handleSave(index, newObj)
    }

    // () => {}, [dependencyArray]
    useEffect(() => {
        // gaurd clause; checks if browser supports
        if (!localStorage) {return}

        // local variable
        let savedData = {}
        // retreival logic
        if (localStorage.getItem('dailygains')) {
            // store the value string of the key string 'dailygains'
            const savedDataString = localStorage.getItem('dailygains')
            savedData = JSON.parse(savedDataString)
        }
        // savedWorkouts = savedData
        setSavedWorkouts(savedData)
    }, [])
   
    return (
        <div className="training-plan-grid">
            {/* the names "workout" and "workoutIndex" are arbitrary 
            okay so "workout" stores the actual string and "workoutIndex" stores its index
            */}
            {Object.keys(training_plan).map((workout, workoutIndex) => {

                // sets each workout day as either complete or incomplete
                //if workoutIndex is 0 that means we are on day 1
                const isLocked = workoutIndex === 0 ?
                    false :
                    //does our completedWorkouts obj include yesterday's index?
                    //use backticks `${}` for literal string
                    !completedWorkouts.includes(`${workoutIndex - 1}`) 
                    console.log(workoutIndex, isLocked)

                const type = workoutIndex % 3 === 0 ?
                    'Push' : 
                    workoutIndex % 3 === 1 ?
                        'Pull' :
                        'Legs'

                const trainingPlan = training_plan[workoutIndex]
                const dayNum = ((workoutIndex) / 8 <= 1) ? '0' + (workoutIndex + 1)
                            : (workoutIndex + 1

                        )
                        
                const icon = workoutIndex % 3 === 0 ? (
                        <i className='fa-solid fa-dumbbell'></i>
                    ) : (
                        workoutIndex % 3 === 1 ? (
                            <i className='fa-solid fa-weight-hanging'></i>
                        ) : (
                            <i className='fa-solid fa-bolt'></i>
                        )
                    )
                

                if (workoutIndex === selectedWorkout) {
                    return (
                        <WorkoutCard 
                        // key is a special internal react identifier
                        //set it to a good data anchorpoint 
                        savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                        key={workoutIndex} 
                        trainingPlan={trainingPlan}
                        type={type}
                        workoutIndex={workoutIndex}
                        icon={icon}
                        dayNum = {dayNum}
                        handleComplete={handleComplete}
                        handleSave={handleSave}
                        />
                    )
                }

                return (
                    <button onClick={() => {
                        //gaurd clause for if that particular index isLocked
                        if (isLocked) {return}
                        // setter function setSelectedWorkout() used to set selectecWorkout = workoutIndex
                        setSelectedWorkout(workoutIndex)
                    }} className={'card plan-card ' + (isLocked ? 'inactive' : '')} key={workoutIndex}>
                        <div className='plan-card-header'>
                            <p>Day {dayNum}</p>
                        </div>
                        {isLocked ? (
                            <i className='fa-solid fa-lock'></i>
                        ) : (icon)}
                        <div className='plan-card-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}