const converKeyValueCsv = (arr) => {
  // if arr is not object(json string) parse them to original form
  const array = typeof arr !== 'object' ? JSON.parse(arr) : arr
  let str = ''

  for (let i = 0; i < array.length; i++) {
    for (let key in array[i]) {
      str += `${key},${array[i][key]}\n`
    }
  }

  str += '\n'
  return str
}

const convertBodyToCsv = (arr) => {
  const array = typeof arr !== 'object' ? JSON.parse(arr) : arr
  let str = ''

  // Extract the keys from the first object
  if (array.length > 0) {
    const headers = ['#', ...Object.keys(array[0])]
    str += headers.join(',') + '\n'
  }

  for (let i = 0; i < array.length; i++) {
    let line = `${i+1},`
    for (let key in array[i]) {
      if (line !== `${i+1},`) line += ','

      line += array[i][key]
    }
    str += line + '\n'
  }
  return str
}

const convertToCsv = (arr, startRow) => {
  let headPart = converKeyValueCsv(arr.slice(0, startRow))
  let bodyPart = convertBodyToCsv(arr.slice(startRow))
  return headPart + bodyPart
}

export const downloadCsv = (data, startRow, fileName) => {
  const csvData = new Blob([convertToCsv(data, startRow)], { type: 'text/csv' })
  const csvURL = URL.createObjectURL(csvData)
  const link = document.createElement('a')
  link.href = csvURL
  link.download = `${fileName}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}