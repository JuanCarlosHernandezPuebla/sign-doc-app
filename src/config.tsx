const setupConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        base: 'http://localhost:3000/',
        documentEntry: '',
        endpoints: {
          downloadDocument: '',
          uploadDocument: ''
        }
      }
    case 'production':
      return {
        base: '',
        endpoints: {
          downloadDocument: '',
          uploadDocument: ''
        }
      }
    default:
      return {
        base: 'http://localhost:3000/',
        endpoints: {
          downloadDocument: '',
          uploadDocument: ''
        }
      }
  }
}
export const config = setupConfig()
