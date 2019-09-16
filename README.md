

# Building Intelligent Applications workshop.

## 1. About this workshop


# 1. Create Cloud9 Workspace

## 1.2. Create new environment
1. Go to the Cloud9 web console.
2. At the top right corner of the console, make sure you’re using one of these regions: Virginia (us-east-1), Oregon (us-west-2), Ireland (eu-west-1) or Singapore (ap-southeast-1)
3. Select Create environment
4. Name it BIA-workshop, and go to the Next step
5. Select Create a new instance for environment (EC2) and pick t2.medium
6. Leave all of the environment settings as they are, and go to the Next step
7. Click Create environment

## 1.3. Optimize your Cloud9 workspace
1. Switch to dark theme 
2. Close the lower terminal window 
3. Close welcome screen
4. Open new terminal 


## 1.4. Install & update your workspace.
Run the following commands 

```bash
# Update the AWS CLI
pip install --user --upgrade awscli

# Install and use Node.js v8.11 (to match AWS Lambda)
nvm install v8.11.0
nvm alias default v8.11.0

# Install the AWS Amplify CLI
npm install -g @aws-amplify/cli

# Install jq
sudo yum install jq -y
```

## 1.5. Configure default region

Configure default AWS region for Amplify CLI, please note we are using us-west-2 for this workshop.

```bash
cat <<END > ~/.aws/config
[default]
region=us-west-2
END
```

# Bootstrap our React application

Setup our react application

```bash
npx create-react-app bia-workshop-app


```bash
cd bia-workshop-app/
```

## Install Material UI
For our components we will use Material UI. Run the following command and ignore any warnings.

```bash
npm install --save @material-ui/core
```

## Start your app
```bash
npm start
```

## Open additional terminal 
We want to keep the app preview running so we will open a new terminal to work with.

## Open preview window in new browser tab



