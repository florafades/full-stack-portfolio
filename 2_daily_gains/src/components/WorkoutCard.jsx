import React, { useState } from "react"
import Modal from "./Modal"
import { exerciseDescriptions } from "../utils"

export default function WorkoutCard(props) {
    const {trainingPlan, workoutIndex, type, dayNum, icon,
    handleSave, handleComplete, savedWeights} = props
    
    const {warmup, workout} = trainingPlan || {}
    // [a, setA] = useState(null) --> a = null on first render
    const [showExerciseDescription, setShowExerciseDescription] = useState(null)
    const [weights, setWeights] = useState(savedWeights || {})

    function handleAddWeight(title, weight) {
        console.log(title, weight)    
        const newObj = {
            // spreader
            ...weights,
            // dynamic key
            [title]: weight
        }
        setWeights(newObj)
    }

    return (
        <div className="workout-container">
            {/* modal only shows if showExerciseDescription is true ie is not null/empty */}
            {showExerciseDescription && (
                <Modal 
                    showExerciseDescription={showExerciseDescription}
                    handleCloseModal={() => {setShowExerciseDescription(null)}}
                />
            )}
            <div className="workout-card card">
                <div className="plan-card-header">
                    <p>Day {dayNum}</p>
                    {icon}
                </div>
                <div className="plan-card-header">
                    <h2><b>{type} Workout</b></h2>
                </div>
            </div>

            <div className="workout-grid">
                <div className="exercise-name">
                    <h4>Warmup</h4>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max Weight</h6>
                {/* callback function */}
                {/* warmupExercise and warmupIndex are arbitrarily named */}
                {warmup.map((warmupExercise, wIndex) => {
                    return (
                        <React.Fragment key={wIndex}>
                            <div className="exercise-name">
                                <p>{wIndex + 1}. {warmupExercise.name}</p>
                                <button 
                                    onClick={() => {
                                        setShowExerciseDescription({
                                            name: warmupExercise.name,
                                            description: exerciseDescriptions[warmupExercise.name]
                                        })
                                    }} 
                                    className="help-icon">
                                    <i className="fa-regular fa-circle-question" />
                                </button>
                            </div>
                            <p className="exercise-info">{warmupExercise.sets}</p>
                            <p className="exercise-info">{warmupExercise.reps}</p>
                            <input 
                                value={weights[warmupExercise.name] || ''}
                                onChange={(e) => {
                                    handleAddWeight(warmupExercise.name, e.target.value)
                                }}
                                className="weight-input" 
                                placeholder="N/A"
                                disabled
                            />
                        </React.Fragment>
                    )
                })}
            </div>

            <div className="workout-grid">
                <div className="exercise-name">
                    <h4>Workout</h4>
                </div>
                <h6>Sets</h6>
                <h6>Reps</h6>
                <h6 className="weight-input">Max Weight</h6>
                {/* callback function */}
                {workout.map((workoutExercise, workoutIndex) => {
                    return (
                        <React.Fragment key={workoutIndex}>
                            <div className="exercise-name">
                                <p>{workoutIndex + 1}. {workoutExercise.name}</p>
                                <button 
                                    onClick={() => {
                                        setShowExerciseDescription({
                                            name: workoutExercise.name,
                                            description: exerciseDescriptions[workoutExercise.name]
                                        })
                                    }} 
                                    className="help-icon">
                                    <i className="fa-regular fa-circle-question" />
                                </button>
                            </div>
                            <p className="exercise-info">{workoutExercise.sets}</p>
                            <p className="exercise-info">{workoutExercise.reps}</p>
                            <input 
                                value={weights[workoutExercise.name] || ''}
                                onChange={(e) => {
                                    handleAddWeight(workoutExercise.name, e.target.value)
                                }}
                                className="weight-input" 
                                placeholder="N/A"
                                
                            />
                        </React.Fragment>
                    )
                })}
            </div>
            
            <div className="workout-buttons">
                <button onClick={() => {
                    // {weights} is a dictionary obj
                    handleSave(workoutIndex, {weights})
                }}>Save & Exit</button>
                <button onClick={() => {
                    handleComplete(workoutIndex, {weights})
                }}
                // Complete button is disabled until all the weight fields are filled out
                //ie until there is a weight associated with every exercise key
                //we do this by comparing the length of the weights object to 
                //how many workout keys are found in workout
                disabled={Object.keys(weights).length !== workout.length}>Complete</button>
            </div>
        </div>
    )
}