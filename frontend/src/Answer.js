export default function Answer(props) {
  //Returns a input field where a user can input their translation of a word.
  const handleChange = (e) => {
    //Sets input value to userWords array
    props.userWords[e.target.id] = e.target.value;
  };
  if (props.hasAnswered) {
    //Disable input if user has submitted answers
    return (
      <input
        onChange={handleChange}
        type="text"
        autoComplete="off"
        id={props.index}
        name={props.word}
        style={{ color: props.color }}
        value={props.userWords[props.index]}
        disabled
      />
    );
  } else {
    //Return input field which gets it's coloring based on answer status
    return (
      <input
        onChange={handleChange}
        type="text"
        autoComplete="off"
        id={props.index}
        name={props.word}
        style={{ color: props.color }}
        value={props.userWords[props.index]}
      />
    );
  }
}
