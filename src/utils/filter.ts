export const makeFilterNormal = <T = any>(params: T): T => {
  const postData: any = {}
  const query = params as any
  for (const key in query) {
    const value = query[key]
    if (value !== undefined && value !== null && value !== '') {
      postData[key] = value
    }
  }
  return postData
}
