export default (number) => {
  return Number(number.split("").slice(1).filter((e)=> e !== ',').join('')) 
}
