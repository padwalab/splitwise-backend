# Splitwise BackEnd (information)

## schema details

### User

name
email
phone
password(hash)
profile_photo
default_currency
time_zone
language

=> sequelize model:create --name Users --attributes name:string,email:string,phone:string,password:string,profile_photo:string,default_currency:string,time_zone:string,language:string
