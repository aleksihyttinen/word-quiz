export default function LanguageSelection(props) {
  const changeLanguage = (e) => {
    if (props.whichList === "first") {
      props.setDisplayedLanguages({
        first: e.target.value,
        second: props.displayedLanguages.second,
      });
    } else {
      props.setDisplayedLanguages({
        first: props.displayedLanguages.first,
        second: e.target.value,
      });
    }
  };
  return (
    <select
      defaultValue={props.selected}
      onChange={changeLanguage}
      name="languages"
    >
      {props.languages.map((language) => {
        return (
          <option key={language} value={language}>
            {language}
          </option>
        );
      })}
    </select>
  );
}
