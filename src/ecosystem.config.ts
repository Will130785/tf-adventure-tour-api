// make sure name is the same in the auto deployment record
export default {
    apps: [{
      name: 'your-app-name',
      script: 'npm',
      args: 'run node:start',
      env_production: {
        NODE_ENV: 'production'
      },
      env_development: {
        NODE_ENV: 'development'
      }
    }]
  }