export default function Hero() {
    return(
        <>
            <h5>Complete this training program if you want to ...</h5>
            <ol className="benefits-divst">
                <div>Follow a simple program with guaranteed results</div>
                <div>Get fit, healthy, strong and toned</div>
                <div>Learn more about gym, training and technique</div>
                <div>Become a lifetime gym girl <i className="fa-solid fa-heart"></i>⁠</div>
            </ol>
            <h3>The Rules</h3>
            <p>To complete this program, you must follow these 3 simple rules:</p>
            <ul className="rules-divst">
                <div className="rule-item">
                    <p><b>Rest</b></p>
                    <p>Ensure that you are taking rest days where necessary</p>
                </div>
                <div className="rule-item">
                    <p><b>Reps</b></p>
                    <p>Every rep is a pause rep 
                    following a <abbr title="2 seconds down - 2 seconds pause - 2 seconds up">2 - 2 - 2 tempo</abbr></p>
                </div>
                <div className="rule-item">
                    <p><b>Weight*</b></p>
                    <p>Select the maximum weight that allows you to complete the set with good form</p>
                </div>
            </ul>
            <small>* The first and second set should be at 75% and 85% of your working weight
                used for the last two sets.
            </small>
            <h3>The Training Plan</h3>
            <p>This training plan uses this rotation <i className="fa-solid fa-arrow-down"></i> </p>
            <p><b><i>Push &rarr; Pull &rarr; 
                Legs &rarr; Repeat</i></b></p>
            <p>Complete all of the workouts below and track your 
                projects along the way <i className="fa-solid fa-check"></i>
            </p>
        </>
    )
}