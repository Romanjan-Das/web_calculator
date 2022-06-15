const PLUS='+',MINUS='-',DIVIDE='/',MULTIPLY='x',EQUAL='=';
var process_equation=""; /* var input_equation="5x20-5+3x5+20/5+2x3x2+99/11/9-2x-2x-2";*/
var input_equation="";

var p; var c; var input_string=""; var no_key_pressed=true;
var allow=false; var equal_is_pressed=false;


function evaluate_string(inp_eq){
    input_equation=inp_eq;
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
    return process_equation;
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

function verify_input(x){
    if(equal_is_pressed && cn(x)){
        no_key_pressed=true; allow=false; input_string=""; equal_is_pressed=false;
    }
    else{
        equal_is_pressed=false;
    }
    c=x;

    if(no_key_pressed){
        if(c==MINUS||cn(c)){
            p=c;
            no_key_pressed=false;
            allow=true;
        }
    }
    else{
        if(c==DIVIDE){allow=adi();}
        if(c==MULTIPLY){allow=amu();}
        if(c==PLUS){allow=apl();}
        if(c==MINUS){allow=ami();}
        if(cn(c)){allow=anu();}
        if(c==EQUAL){allow=aeq();}
    }

    if(c!=EQUAL && allow){
        p=c;
        input_string=input_string+c;
        document.getElementsByClassName("text")[0].innerHTML=input_string;
    }
    else if(c==EQUAL && allow){
        input_string=evaluate_string(input_string);
        document.getElementsByClassName("text")[0].innerHTML=input_string;
        input_string=input_string+""; // this converts number to string
        p=input_string.charAt(input_string.length-1);
    }
}

function cn(x){
    if(x=='0'||x=='1'||x=='2'||x=='3'||x=='4'||x=='5'||x=='6'||x=='7'||x=='8'||x=='9'){
        return true;
    }
    else{
        return false;
    }
}

function adi(){
    if(p==DIVIDE||p==MULTIPLY||p==PLUS||p==MINUS){
        return false;
    }
    else{
        return true;
    }
}

function amu(){
    if(p==DIVIDE||p==PLUS||p==MINUS||p==MULTIPLY){
        return false;
    }
    else{
        return true;
    }
}

function apl(){
    if(p==DIVIDE||p==MULTIPLY||p==MINUS||p==PLUS){
        return false;
    }
    else{
        return true;
    }
}

function ami(){
    if(p==PLUS||p==MINUS){
        return false;
    }
    else{
        return true;
    }
}

function anu(){
    return true;
}

function aeq(){
    if(p==MULTIPLY||p==DIVIDE||p==PLUS||p==MINUS){
        c=='0';
        return false;
    }
    else{
        return true;
    }
}

function clear_input(){
    document.getElementsByClassName("text")[0].innerHTML="";
    input_equation=""; process_equation=""; input_string="";
    p=""; c=""; no_key_pressed=true; allow=false;
    equal_is_pressed=false;
}
