const response = require('cfn-response');
const aws = require('aws-sdk');
const lex = new aws.LexModelBuildingService({ apiVersion: '2017-04-19' });
const iam = new aws.IAM();
const lambdaClient = new aws.Lambda({ apiVersion: '2017-04-19' });
exports.handler = function(event, context) {
    if (event.RequestType == 'Delete') {
        response.send(event, context, response.SUCCESS);
        return;
    }
    let newSlotTypeParams = [
        
        
        {
            "name": "FlowerTypes",
            "description": "Types of flowers to pick up",
            "enumerationValues": [
                
                {
                    "value": "tulips"
                },
                
                {
                    "value": "lillies"
                },
                
                {
                    "value": "roses"
                },
                
            ]
        },
        
        
    ];
    let intentParams = [
        
        {
            "name": "OrderFlowers",
            
            "confirmationPrompt": {
                "maxAttempts": 2, 
                "messages": [
                    {
                        "content": "Okay, your {FlowerType} will be ready for pickup by {PickupTime} on {PickupDate}. Does this sound okay?", 
                        "contentType": "PlainText"
                    }
                ]
            }, 
            
            
            "rejectionStatement": {
                "messages": [
                    {
                    "content": "Okay, I will not place your order.", 
                    "contentType": "PlainText"
                    }
                ]
            }, 
        
            "sampleUtterances": [
            
                "I would like to order some flowers",
            
                "I would like to pick up flowers",
            
            ],
        
            "fulfillmentActivity": {
                "type": "ReturnIntent"
            },
        
            "slots": [
                
                {
                    "name": "FlowerType",
                    "slotConstraint": "Required",
                    "priority": 0,
                    "slotType": "FlowerTypes",
                    "slotTypeVersion": "$LATEST",
                    "valueElicitationPrompt": {
                        "maxAttempts": 3,
                        "messages": [
                            {
                                "content": "What type of flowers would you like to order?",
                                "contentType": "PlainText"
                            }
                        ]
                    }
                },
                
                {
                    "name": "PickupDate",
                    "slotConstraint": "Required",
                    "priority": 1,
                    "slotType": "AMAZON.DATE",
                    
                    "valueElicitationPrompt": {
                        "maxAttempts": 3,
                        "messages": [
                            {
                                "content": "What day do you want the {FlowerType} to be picked up?",
                                "contentType": "PlainText"
                            }
                        ]
                    }
                },
                
                {
                    "name": "PickupTime",
                    "slotConstraint": "Required",
                    "priority": 2,
                    "slotType": "AMAZON.TIME",
                    
                    "valueElicitationPrompt": {
                        "maxAttempts": 3,
                        "messages": [
                            {
                                "content": "At what time do you want the {FlowerType} to be picked up?",
                                "contentType": "PlainText"
                            }
                        ]
                    }
                },
                
            ]
        },
        
    ];
    let botName = "OrderFlowers";
    if(process.env.ENV && process.env.ENV !== "NONE") {
      botName = botName + '_' + process.env.ENV;
    }

    let botParams = {
        "name": botName,
        "intents": [
        
            {
                "intentName": "OrderFlowers",
                "intentVersion": "$LATEST"
            },
        
        ],
        "childDirected": false,
        "locale": "en-US",
        "abortStatement": {
            "messages": [
                {
                    "content": "I don't understand. Can you try again?", 
                    "contentType": "PlainText"
                }, 
                {
                    "content": "I'm sorry, I don't understand.", 
                    "contentType": "PlainText"
                }
            ]
        }, 
        "clarificationPrompt": {
            "maxAttempts": 3, 
            "messages": [
                {
                    "content": "I'm sorry, I didn't hear that. Can you repeat what you just said?", 
                    "contentType": "PlainText"
                }, 
                {
                    "content": "Can you say that again?", 
                    "contentType": "PlainText"
                }
            ]
        }, 
        
        "voiceId": "Matthew",
        
        
        "idleSessionTTLInSeconds": "300"
        
    };
    
    checkAndCreateLexServiceRole()
    .then(()=>{ return getSlotTypes(newSlotTypeParams);})
    .then(()=>{ return putSlotTypes(newSlotTypeParams);})
    .then(()=>{ return getIntents(intentParams);})
    .then(()=>{ return putIntents(intentParams);})
    .then(()=>{ return getBot(botParams);})
    .then(()=>{ return putBot(botParams);})
    .then((res) => {
        response.send(event, context, response.SUCCESS, res.ApplicationResponse);
    })
    .catch((err) => {
        console.log(err.stack);
        response.send(event, context, response.FAILED, {Error: err});
        throw err;
    });
};

function checkAndCreateLexServiceRole() {
    
    return checkIfLexServiceRoleExists()
    .then((roleExists) => {
        if(!roleExists) {
            return createNewLexServiceRole();
        }
    });
}

function createNewLexServiceRole() {
 
    // Lex service automatically creates the needed polcies and truust relationships   
    const params = {
      AWSServiceName: 'lex.amazonaws.com',
      Description: 'Allows Amazon Lex to create and manage voice enabled bots on your behalf'
    };
    
    return iam.createServiceLinkedRole(params).promise();
    
}

function checkIfLexServiceRoleExists() {
    let rolePresent;
    
    const params = {
        RoleName: "AWSServiceRoleForLexBots"
    };
    
    return iam.getRole(params).promise()
    .then((result) => {
        rolePresent = true;
        return rolePresent;
    })
    .catch((e) => {
        rolePresent = false;
        return rolePresent;
    });
}

function getSlotTypes(newSlotTypeParams){
    const tasks = []; 
    newSlotTypeParams.forEach( slotType => {
        const params = {
            'name': slotType.name,
            'version': '$LATEST'
        };
        tasks.push(
            lex.getSlotType(params).promise()
            .then((data)=>{
                slotType['checksum'] = data.checksum;
            })
            .catch((err)=>{
            })
        ); 
    }); 
    return Promise.all(tasks);
}

function putSlotTypes(newSlotTypeParams){
    const tasks = []; 
    newSlotTypeParams.forEach( slotType => {
        tasks.push(
            lex.putSlotType(slotType).promise()
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                console.log(err); 
                throw err; 
            })
        );
    }); 
    return Promise.all(tasks);
}

function getIntents(intentParams){
    const tasks = []; 
    intentParams.forEach( intent => {
        const params = {
            'version': '$LATEST',
            'name': intent.name
        };
        tasks.push(
            lex.getIntent(params).promise()
            .then((data)=>{
                intent['checksum'] = data.checksum;
            })
            .catch((err)=>{
            })
        ); 
    });
    return Promise.all(tasks);
}

function putIntents(intentParams){
    const tasks = []; 
    intentParams.forEach( intent => {
        tasks.push(
            ensureLambdaFunctionAccess(intent)
            .then(()=>{
                delete intent.fulfillmentLambda;
                return lex.putIntent(intent).promise();
            })
            .then((data)=>{
                console.log(data);
            })
            .catch((err)=>{
                console.log(err); 
                throw err; 
            })
        );
    }); 
    return Promise.all(tasks);
}

function ensureLambdaFunctionAccess(intent){
    if(intent.fulfillmentLambda){
        const { 
            region,
            accountId,
            lambdaArn, 
            lambdaName
        } = intent.fulfillmentLambda;

        const params = {
            FunctionName: lambdaName,
            StatementId: `Lex-${intent.name}`+ "607a6e43",
            Action: 'lambda:InvokeFunction',
            Principal: 'lex.amazonaws.com',
            SourceArn: `arn:aws:lex:${region}:${accountId}:intent:${intent.name}:*`,
        }

        return lambdaClient.addPermission(params).promise()
                .then((data)=>{
                    console.log(data);
                    return data; 
                })
                .catch((err)=>{
                    console.log(err); 
                    throw err; 
                });
    }else{
        return Promise.resolve(undefined);
    }
}

function getBot(botParams){
    params = {
        'name': botParams.name,
        'versionOrAlias': '$LATEST'
    }; 
    return  lex.getBot(params).promise()
            .then((data)=>{
                botParams['checksum'] = data.checksum;
            })
            .catch((err)=>{
            });
}

function putBot(botParams){
    return lex.putBot(botParams).promise()
            .then((data)=>{
                console.log(data);
                return data; 
            })
            .catch((err)=>{
                console.log(err); 
                throw err; 
            });
}