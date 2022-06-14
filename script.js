const PLUS='+',MINUS='-',DIVIDE='/',MULTIPLY='x',LEFTBRACKET='(',RIGHTBRACKET=')'
var process_equation=""; var input_equation="5x20-5+3x5+20/5+2x3x2+99/11/9-2x-2x-2";
function evaluate_string(){
    var m=0; var temp=""; var temporary_equation="";
    while(temporary_equation!=input_equation){
        temporary_equation=input_equation;
        process_equation=input_equation;
        process_equation=remove_redundant_plus_and_minus_sign(process_equation);
        while(temp!=process_equation){
            temp=process_equation;
            m=0;
            while(m<process_equation.length){
                if(DIVIDE==process_equation.charAt(m)){
                    divide_or_multiply(m,DIVIDE);
                    break;
                }
                if(MULTIPLY==process_equation.charAt(m)){
                    divide_or_multiply(m,MULTIPLY);
                    process_equation=remove_redundant_plus_and_minus_sign(process_equation);
                    break;
                }
                m++;
            }
        }
        process_equation=add_or_subtract(process_equation);
        console.log(process_equation);
    }
}

function remove_redundant_plus_and_minus_sign(s){
    var i=0; var tempString="";
    var k=0; var l=false;
    while(i<s.length){
        if(s.charAt(i)!=PLUS && s.charAt(i)!=MINUS){
            tempString=tempString+s.charAt(i);
            i++;
        }
        else{
            while(s.charAt(i)==PLUS||s.charAt(i)==MINUS){
                if(s.charAt(i)==MINUS){
                    k++;
                }
                i++;
                l=true;
            }
            if(k%2!=0 && l==true){
                tempString=tempString+"-";
                k=0; l=false;
            }
            else if(k%2==0 && l==true){
                tempString=tempString+"+";
                k=0; l=false;
            }
        }
    }
    return tempString;
}

function divide_or_multiply(operator_position,operator){
    var number1="",number2="",left_of_number1="",right_of_number2="";
    var result;
    var j;
    j=operator_position-1;
    while(true){
        j=j-1;
        if(j==-1){
            break;
        }
        if(process_equation.charAt(j)==MINUS||process_equation.charAt(j)==PLUS||process_equation.charAt(j)==MULTIPLY||process_equation.charAt(j)==DIVIDE){
            left_of_number1=process_equation.substring(0,j+1);
            break;
        }
    }
    number1=process_equation.substring(j+1,operator_position);

    j=operator_position+1;
    while(true){
        j=j+1;
        if(j==process_equation.length){
            break;
        }
        if(process_equation.charAt(j)==MINUS||process_equation.charAt(j)==PLUS||process_equation.charAt(j)==MULTIPLY||process_equation.charAt(j)==DIVIDE){
            right_of_number2=process_equation.substring(j,process_equation.length);
            break;
        }    
    }
    number2=process_equation.substring(operator_position+1, j);

    if(operator==DIVIDE){
        result=parseFloat(number1)/parseFloat(number2);
        process_equation=left_of_number1+result+right_of_number2;
    }
    if(operator==MULTIPLY){
        result=parseFloat(number1)*parseFloat(number2);
        process_equation=left_of_number1+result+right_of_number2;
    }

}

function add_or_subtract(s){
    var i=s.length-1;
    var answer,str="";
    var num=0;
    while(i!=-1){
        str=s.charAt(i)+str;
        if(MINUS==s.charAt(i)||PLUS==s.charAt(i)||i==0){
            num=parseFloat(str)+num;
            str="";
        }
        i=i-1;
    }
    answer=num;
    return answer;
}