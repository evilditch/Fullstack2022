TOKEN=$(curl -s -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' --data '{"username":"Pahis","password":"salaisuus"}' http://localhost:3003/api/login | jq -r '.token')