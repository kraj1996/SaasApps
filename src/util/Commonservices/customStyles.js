export const customStyles = {
  control: (base, state) => ({
    ...base,
    height: 15,
    minHeight: 26,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    borderColor: state.isFocused ? "#ced4da" : "#ced4da",
    boxShadow: "none",
    whiteSpace: "normal",
    borderRadius: 0,
    // fontWeight: " normal"
  }),
  placeholder: (defaultStyles, state) => {
    return {
      ...defaultStyles,
      color: "none",
      position: "absolute",
      top: state.hasValue || state.selectProps.inputValue ? -8 : "",
      backgroundColor: state.hasValue || state.selectProps.inputValue
        ? "white"
        : "transparent",
      transition: "top 0.1s, font-size 0.1s",
      fontSize: state.hasValue || state.selectProps.inputValue ? "13px" : "12px",
      lineHeight: "18px",
      width: "80%",
      fontWeight: state.hasValue || state.selectProps.isFocused ? " 600" : "500",
    };
  },
  menu: (styles) => ({
    ...styles,
    width: "100%",
    fontSize: 11,
    padding: 0,
  }),
  menuList: (styles) => ({
    ...styles,
    width: "100%",
    fontSize: 11,
    padding: 0,
  }),
  option: (styles, { _, isFocused }) => ({
    ...styles,
    backgroundColor: isFocused ? "#2175c1" : "transparent",
    color: isFocused ? "white" : "black",
    "&:hover": {
      backgroundColor: isFocused ? "#2175c1" : "transparent",
      color: isFocused ? "white" : "black",
      fontWeight: "600",
    },
    singleValue: (provided, state) => ({
      ...provided,
      fontSize: "11px",
      fontWeight: "600",
    }),
  }),

  container: (provided, _) => ({
    ...provided,
    // marginTop: 50
  }),
  valueContainer: (provided, _) => ({
    ...provided,
    overflow: "visible",
    fontSize: "11px",
    fontWeight: "600",
  }),
};
