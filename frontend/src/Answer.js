export default function Answer(props) {
  const handleChange = (e) => {
    props.userWords[e.target.id] = e.target.value;
  };
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
