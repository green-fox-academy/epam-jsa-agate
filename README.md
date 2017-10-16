# epam-jsa-agate
EPAM-JSA-AGATE --Local Business Finder (Yelp)

# run mocha test in command line
npm run test:backend

# configuration 
**mongodb** create `.env` in root
use .env.sample as template

# import businesses to mongodb

`mongoimport --db heartbeat --host mongodb://jessie:password@ds113835.mlab.com --collection businesses --drop --file ./businesses
`
