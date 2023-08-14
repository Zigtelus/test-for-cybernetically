export const changeToken = (token: string) => ({
  type: 'CHANGE_TOKEN',
  payload: token
});

export const changeSymbol = (symbol: string) => ({
  type: 'CHANGE_SYMBOL',
  payload: symbol
})

export const changePopup = (status: boolean) => ({
  type: 'CHANGE_POPUP',
  payload: status
})