function Currency({ value }) {
  return "₹ " + (value ? value.toLocaleString("en-In") : 0);
}

export default Currency;
