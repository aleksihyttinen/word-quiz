export default function LanguageSelection(props) {
  //Returns a select with all available languages as options
  const changeLanguage = (e) => {
    //Sets changed language to the corresponding list
    if (props.whichList === "first") {
      props.setDisplayedLanguages({
        first: e.target.value,
        second: props.displayedLanguages.second,
      });
    }
    if (props.whichList === "second") {
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
        //Blocks user from selecting same language to both lists
        //by disabling the option which is selected on the other list
        return (props.whichList === "second" &&
          language === props.displayedLanguages.first) ||
          (props.whichList === "first" &&
            language === props.displayedLanguages.second) ? (
          <option key={language} disabled value={language}>
            {language}
          </option>
        ) : (
          <option key={language} value={language}>
            {language}
          </option>
        );
      })}
    </select>
  );
}
