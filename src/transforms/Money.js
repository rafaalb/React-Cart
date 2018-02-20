export default (number) => {
  return number.split("").slice(1).filter((e)=> e !== ',').join('');
}
