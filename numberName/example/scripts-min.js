angular.module("app",[]).controller("NumberNameCtrl",function(n){n.$watch("number",function(e){parseInt(e)==e&&(n.name=numberName(e))})});