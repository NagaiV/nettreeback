import randToken from 'rand-token'

export const generateRandomToken = () => {
  return randToken.generate(4)
}

export const checkDifferenceInMinutes = (d2, d1) => {
  var diff = (d2.getTime() - d1.getTime()) / 1000
  diff /= 60
  return Math.abs(Math.round(diff))
}
