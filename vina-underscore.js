
var cb = function(value, context) {
    if (value == null) return function(obj) {
    	    return obj;
 		};
    if (typeof value == 'function') return function() {
      		return value.apply(context, arguments);
   		};
    return function(obj) {
    	return obj == null ? void 0 : obj[value];
    };
};



//object函数
_.ismatch = function(obj, property){
	var keys = _.keys(property)
	for (var i = 0; i < keys.length; i++){
		key = keys[i];
		if (obj[key] !== property[key] || !(key in obj)) return false;
	}
	return true;
};











//todo
//测试是否是对象
//错误处理

_.each = function(obj, iteratee, context){
	if (obj == null) return obj;
	if (obj instanceof Array) {
		for (var i = 0; i < obj.length; i++) {
			iteratee.call(context,obj[i],i,obj);
		}
	}else{
		for (var key in obj){
			var value = obj[key];
			iteratee.call(context,value,key,obj);
		
		}
	}
};


_.map = function(obj, iteratee, context){
	var list = []
	if (obj == null) return obj;
	if (obj instanceof Array) {
		for (var i = 0; i < obj.length; i++) {
			list[i] = iteratee.call(context,obj[i],i,obj);
		}
	}else{
		var i = 0
		for (var key in obj){
			var value = obj[key];
			list[i] = iteratee.call(context,value,key,obj);
			i = i+1
		}
	}
	return list;
};


_.reduce = function(obj, iteratee, memo, context){
	if (obj == null) return obj;
	var keys = !(obj instanceof Array)? _.keys(obj):null;
	if (memo == null){
		memo = obj instanceof Array? obj[0]: obj[keys[0]];
		var initial = 1;
	}else{
	   	var initial = 0;
    };
	if (obj instanceof Array) {
		for (var i = initial; i < obj.length; i++) {
			memo = iteratee.call(context,memo,obj[i],i,obj);
		}
	}else{
		for (var i = initial; i < keys.length; i++){
			var key = keys[i]
			var value = obj[key];
			memo = iteratee.call(context,memo,value,key,obj);
		}
	}
	return memo;
};


//todo 未考虑不传入memo的情况
_.reduceRight = function(obj, iteratee, memo, context){
	if (obj == null) return obj;
	if (obj instanceof Array) {
		for (var i = obj.length-1 ; i > -1 ; i--) {
			memo = iteratee.call(context,memo,obj[i],i,obj);
		}
	}else{
		keys = _.keys(obj)
		for (var i = keys.length-1 ; i > -1 ; i--) {
			memo = iteratee.call(context,memo,obj[keys[i]],keys[i],obj);
		}
	}
	return memo
};


_.find = function(obj, predicate, context){
	if (obj == null) return obj;
	if (obj instanceof Array){
		for (var i = 0; i < obj.length; i++) {
			if (predicate(obj[i],i,obj)){
				var result = obj[i];
				break
			}
		}
	}else{
		for (var key in obj){
			var value = obj[key];
			if (predicate(value,key,obj)){
				var result = value;
				break
			}
		}
	}
	return result;

};


_.filter = function(obj, predicate, context){
	if (obj == null) return obj;
	if (obj instanceof Array){
		var results = [];
		for (var i = 0; i < obj.length; i++) {
			if (predicate(obj[i],i,obj)){
				results.push(obj[i]);
			}
		}
	}else{
		var results = {};
		for (var key in obj){
			var value = obj[key];
			if (predicate(value,key,obj)){
				results[key]=value;
			}
		}
	}
	return results;

};


//可利用matches和filter代替                   
_.where =function(obj, property){
	var results = []
	if (obj == null) return obj;
	if (obj instanceof Array){
		for (var i = 0; i < obj.length; i++) {
			if (_.ismatch(obj[i], property)){
				results.push(obj[i]);
			}
		}

	}
	return results;
};


//可以用matches和find代替
_.findwhere =function(obj, property){
	var result
	if (obj == null) return obj;
	if (obj instanceof Array){
		for (var i = 0; i < obj.length; i++) {
			if (_.ismatch(obj[i], property)){
				result = obj[i];
				break
			}
		}

	}
	return result;
};



//object 函数
_.keys = function(object){
	keys = [];
	for (var key in object) {
		keys.push(key)
	}
	return keys
}


//完全与filter相反，大体方法与filter相同
_.reject = function(obj, predicate, context){
	if (obj == null) return obj;
	if (obj instanceof Array){
		var results = [];
		for (var i = 0; i < obj.length; i++) {
			if (!predicate(obj[i],i,obj)){
				results.push(obj[i]);
			}
		}
	}else{
		var results = {};
		for (var key in obj){
			var value = obj[key];
			if (!predicate(value,key,obj)){
				results[key]=value;
			}
		}
	}
	return results;

};


//与filter，reject方法相似
_.every = function(obj, predicate, context){
	if (obj == null) return obj;
	if (obj instanceof Array){
		for (var i = 0; i < obj.length; i++) {
			if (!predicate(obj[i],i,obj)) return false;
		}
	}else{
		for (var key in obj){
			var value = obj[key];
			if (!predicate(value,key,obj)) return false;
		}
	}
	return true;
};


_.some = function(obj, predicate, context){
	if (obj == null) return obj;
	if (obj instanceof Array){
		for (var i = 0; i < obj.length; i++) {
			if (predicate(obj[i],i,obj)) return true;
		}
	}else{
		for (var key in obj){
			var value = obj[key];
			if (predicate(value,key,obj)) return true;
		}
	}
	return false;
};


_.contains = function(obj, value, fromIndex){
	if (obj == null) return obj;
	if (obj instanceof Array){
		if (obj.indexOf(value, fromIndex) > -1) return true;
	}else{
		for (var key in obj)
			if (obj[key] === value) {
				return true;
		}
	}
	return false;
};


//slice 报错：slice is not a function？？
//报错var args = slice.call(arguments, 2);
//报错var args = arguments.slice(2);
//note arguments不是数组，要转换成数组
//note 如果method 不是函数，把method装换成函数 
//todo 找出typeof 和 instanceof的区别
_.invoke = function(obj, method){
	var args = Array.prototype.slice.call(arguments, 2);
	var func = typeof method == 'function' ? method : obj[method];
	return _.map(obj, function(value){
		return func.apply(value, args)
	})
};


//todo 用_.map精简函数
_.pluck = function(obj, property){
	var results = [];
	for (var i = 0; i < obj.length; i++) {
		component = obj[i];
		results.push(component[property]);
	}
	return results;
}


//todo 检测obj是否为空
_.max = function(obj, iteratee, context){
	var maxnum = -Infinity;
	var result;
	if (obj == null) return obj;
	if(iteratee){
		iteratee = cb(iteratee, context);
		for (var i = 0; i < obj.length; i++){
			var tran = iteratee.call(context, obj[i], i, obj);
			if (tran > maxnum) {
				maxnum = tran;
				result = obj[i];
			}
		}
	}else{
		for (var i = 0; i < obj.length; i++){
			var tran = obj[i];
			if (tran > maxnum){
				maxnum = tran;
				result = obj[i];
			}
		}
	}
	return result;
}


_.min = function(obj, iteratee, context){
	var maxnum = Infinity;
	var result;
	if (obj == null) return obj;
	if(iteratee){
		for (var i = 0; i < obj.length; i++){
			var tran = iteratee.call(context, obj[i], i, obj);
			if (tran < maxnum) {
				maxnum = tran;
				result = obj[i];
			}
		}
	}else{
		for (var i = 0; i < obj.length; i++){
			var tran = obj[i];
			if (tran < maxnum){
				maxnum = tran;
				result = obj[i];
			}
		}
	}
	return result;
}


//todo 函数，方法，属性的区别
//未考虑 iteratee 是否是方法
//可以用 sort 方法及cb
_.sortBy = function(obj, iteratee, context){
	if (obj == null) return obj;
	var list = obj;	
	var kValue, k1Value;
	if(iteratee){
		for (var i = 1; i < list.length; i++){
			for (var k = i-1; k > -1; k--){
				if (typeof iteratee == 'function' ){
					kValue = iteratee.call(context, list[k], k, list);
					k1Value = iteratee.call(context, list[k+1], k+1, list);
				}else{
					kValue = list[k][iteratee];
					k1Value = list[k+1][iteratee];
				}
				if (kValue > k1Value){
					var big = list[k];
					var small = list[k+1];
					list[k] = small;
					list[k+1] = big
				}else{
					continue;
				}
			}
		}
	}else{
		for (var i = 1; i < list.length; i++){
			for (var k = i-1; k > -1; k--){
				if (list[k] > list[k+1]){
					var small = list[k+1];
					var big = list[k];
					list[k] = small;
					list[k+1] = big
				}else{
					continue;
				}
			}
		}
	}
	return list;
}



//subset

_.groupBy = function(obj, iteratee, context){
	iteratee = cb(iteratee, context);
	var results = {};
	var key;
	var list = _.map(obj, function(value, index, list) {
    	return {
    		value: value,
        	index: index,
        	key: iteratee(value, index, list)
      	};
    });
    for (var i = 0; i < list.length; i++){
    	var subset = list[i];
    	var keys = subset['key'];
    	if (keys in results){
    		results[keys].push(subset['value']);
    	}else{
    		results[keys] = [subset['value']];
    	}

    }
    return results;
}




_.indexBy = function(obj, iteratee, context){
	iteratee = cb(iteratee, context);
	var results = {};
	for (var i = 0; i < obj.length; i++){
		var key = iteratee(obj[i], i, obj);
		results[key] = obj[i];
	}
	return results;
}




_.countBy = function(obj, iteratee, context){
	iteratee = cb(iteratee, context);
	var results = {};
	for (var i = 0; i < obj.length; i++){
		var key = iteratee(obj[i], i, obj);
		if (key in results){
    		results[key]++;
    	}else{
    		results[key] = 1;
    	}
	}
	return results;
}



_.shuffle = function(obj){
	var length = obj.length;
	var list = obj;
	for (var i = length; i > 0; i--){
		var j =  Math.floor(Math.random() * i);
		var a = list[i-1];
		list[i-1] = list[j];
		list[j] = a;
	}
	return list;
}

//旧的版本
//_.shuffle = function(obj){
//	var length = obj.length;
//	var list = obj;
//	var result = [];
//	for (var i = length; i > 0; i--){
//		var j =  Math.floor(Math.random() * i);
//		var a = list[j];
//		result.push(a)
//		list.splice(j, 1)
//	}
//	return result;
//}


_.sample = function(obj, n){
	var length = obj.length
	var list = obj;
	var result = [];
	if(!n){
		var j =  Math.floor(Math.random() * length);
		return obj[j];
	}else{
		for (var i = length; i > length - n; i--){
			var j =  Math.floor(Math.random() * i);
			var a = list[j];
			result.push(a);
			list.splice(j, 1);
		}
	}
	return result;
}


_.toArray = function(obj){
	if (!obj) return [];
	if (obj instanceof Array) return obj;
	if (typeof obj == "object" ){
		var list = [];
		for (var key in obj) {
			list.push(obj[key])
		}
		return list;
	}
	return arguments;
}



_.size = function(obj){
	var list = _.toArray(obj);
	var length = list.length;
	return length;
}


//todo可以用_.each简化
_.partition = function(obj, predicate){
	var pass = [],
		fail = [];
	if (obj == null) return obj;
	if (obj instanceof Array) {
		for (var i = 0; i < obj.length; i++) {
			(predicate(obj[i], i, obj) ? pass : fail).push(obj[i]);
		}
	}else{
		for (var key in obj){
			var value = obj[key];
			(predicate(value, key, obj) ? pass : fail).push(value);		
		}
	}
	return [pass, fail];
}


//todo n==null 与!n 的区别
_.first = function(array, n){	
	if (n == null) return array[0];
	var result = [];
	for (var i = 0; i < n; i++){
		result.push(array[i]);
	}
	return result;
}


_.initial = function(array, n){
	var length;
	if (n == null){
		length = array.length-1;
	}else{
		length = array.length - n;
	}
	return _.first(array,length);
}


_.last = function(array, n){	
	if (n == null) return array[array.length-1];
	var result = [];
	for (var i = array.length-n; i < array.length; i++){
		result.push(array[i]);
	}
	return result;
}


_.rest = function(array, n){
	var length;
	if (n == null){
		length = array.length-1;
	}else{
		length = array.length - n;
	}
	return _.last(array,length);
}


//todo可以用_.filter简化
//todo void 0 的含义
_.compact = function(array){
	if (array == null) return void 0;
	var result = [];
	for (var i = 0; i < array.length; i++){
		if (array[i]) result.push(array[i]);
	}
	return result;
} 



_.flatten = function(array, shallow){
	if (array == null) return void 0;
	var list = [];
	if (shallow){
		for (var i = 0; i < array.length; i++){
			list = list.concat(array[i]);
		}
	}else{
		for (var i = 0; i < array.length; i++){
			var value = array [i];
			if (value instanceof Array){
				value = _.flatten(value);
				list = list.concat(value);
			}else{
				list = list.concat(value);
			}
		}
	}
	return list;
}



/*
todo 函数add 不能用call 或apply
_.flatten = function(array, shallow){
	if (array == null) return void 0;
	var list = [];
	if (shallow){
		for (var i = 0; i < array.length; i++){
			list = list.concat(array[i]);
		}
	}else{
		var add = function(obj){			
			if (obj instanceof Array){	
				for (var i = 0; i < obj.length; i++){
					var value = obj[i];
					add(value);	
				}	
			}else{
				list.push(obj);
			}
		};
		for (var i = 0; i < array.length; i++){
			add(array[i]);
		}
	}
	return list;
}
*/



_.without = function(array, values){
	var list = [];
	var arg = _.rest(arguments)
	for (var k = 0; k< array.length; k++){
		if (!_.contains(arg, array[k])) list.push(array[k]);
	}
	return list;
}


_.union = function(){
	var arg = arguments;
	return reduce(arg, function(a,b){
		var list = a;
		for (var i = 0; i < b.length; i++){
			if (!contains(list, b[i])) list.push(b[i]);
		}
		return list;
	});
}

_.intersection = function(){
	var arg = arguments;
	return reduce(arg, function(a,b){
		var list = [];
		for (var i = 0; i < b.length; i++){
			if (contains(a, b[i])) list.push(b[i]);
		}
		return list;
	});
}



_.uniq = function(array, isSorted, iteratee){
	if (!(typeof isSorted == 'boolean')){
		iteratee = isSorted;
		isSorted = false;
	}
	var result = [];
	var key, before;
	if (iteratee) iteratee = cb(iteratee);
	if (isSorted){
		for (var i = 0; i < array.length; i++){
			key = iteratee?iteratee(array[i]): array[i];
			if (!(key === before)) result.push(array[i]);
			before = key;
		}
	}else{
		var  before = [];
		for (var i = 0; i < array.length; i++){
			key = iteratee?iteratee(array[i], i, array): array[i];
			if (!(_.contains(before, key))){
				result.push(array[i]);
				before.push(key);
			} 
			
		}
	}
	return result;
}


 _.zip = function() {
    return _.unzip(arguments);
};


_.unzip = function(array){
	var length = (_.max(array, 'length')).length;
	var result = [];
	for (var i = 0; i < length; i++){
		result[i] = _.pluck(array, i);
	}
	return result;
}

_.object = function(key, value){
	var result = {};
	if (value){
		for (var i = 0; i < key.length; i++){
			result[key[i]] = value[i];
		}
	}else{
		for (var i = 0; i < key.length; i++){
			result[key[i][0]] = key[i][1];
		}
	}
	return result;
}

//todo void 0 和 null，undefined 的区别
_.indexOf = function(array, value, isSorted) {
	if (typeof isSorted == 'number'){
		isSorted = isSorted < 0 ? isSorted + length : isSorted;
		for (var i = isSorted; i < array.length; i++){
			if (array[i] === value) return i;			
		}
	}else if (isSorted){
		for (var i = 0; i < array.length; i++){
			i = _.sortedIndex(array, value);
      		return array[i] === value ? i : -1; 
      	}
	}else{
		for (var i = 0; i < array.length; i++){
			if (array[i] === value) return i;
		}
	}
	return -1;
}




_.lastIndexOf = function(array, value, fromIndex){
	if (typeof fromIndex == 'number'){
		fromIndex = fromIndex < 0 ? fromIndex + length : fromIndex;
		for (var i = fromIndex; i > -1; i--){
			if (array[i] === value) return i;			
		}
	}else{
		for (var i =  array.length - 1; i > -1; i--){
			if (array[i] === value) return i;
		}
	}
	return -1;
}



_.sortedIndex = function(list, value, iteratee, context){
	var length = list.length;
	iteratee = iteratee == null? cb(iteratee): function(obj){return obj;};
	var key = iteratee(value, context);
	if (key < iteratee(list[0], 0, list, context)) return 0;
	if (key > iteratee(list[length - 1], length - 1, list, context)) return length;
	var a = 0, b = length - 1;
	while (a < b){
		if (b - a == 1) return b;
		var c = Math.floor((a+b)/2),
		    middle = iteratee(list[c], c, list, context);
		if (key > middle){
			a = c ;
		}else {
			b = c;
		}
	}
	return -1
}



_.findIndex = function(array, predicate, context) {
	predicate = cb(predicate, context);
	for (var i = 0; i < array.length; i++) {
		if (predicate(array[i], i, array)) return i;
	}
};


_.findLastIndex = function(array, predicate, context) {
	for (var i = array.length; i > -1; i--) {
		if (predicate(array[i], i, array)) return i;
	}
};


range = function(start, stop, step){
	var result = [];
	if (arguments.length == 1){
		stop = start;
		start = 0;
	}
	if (stop > start){
		step = step == null? 1: step;
		var i = start;
		while ( i < stop){			
			result.push(i);
			i = i + step;
		}
	}else if(stop < start){
		step = step == null? -1: step;
		var i = start;
		while ( i > stop){			
			result.push(i);
			i = i + step;
		}
	}
	return result;
}



//函数
//note 第二个return不能没有
//todo 错误处理
_.bind = function(func, object){
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		return func.apply(object, args);
	}
}



/*
*todo 检验
bind = function(func, object){
	var args = Array.prototype.slice.call(arguments, 2);
	object.prototype.way = function{
		return func(args);
	}
	return way;
}
*/

//todo 检验
_.bindAll = function(object, methodName) {
	var args = Array.prototype.slice.call(arguments, 1);
	for (var i = 0; i < args.length; i++){
		key = args[i];
        obj[key] = _.bind(obj[key], obj);
	}
	return obj;
}


//合并参数用 args = args.concat(scope) 不可行
//todo 分清arguments 的类型，不是数组，是类数组，不能用数组的某些方法，如slice，concat
_.partial = function(func){
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		var bound = [],
			position = 0;
      	for (var i = 0; i < args.length; i++) {
        	bound[i] = args[i] === _ ? arguments[position++] : args[i];
      	}
     	 while (position < arguments.length) bound.push(arguments[position++]);
		return func.apply(this, bound);
	}
} 

/*
todo 弄明白memoize 的功能
_.memoize = function(func, hasher) {
    var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
        return cache[address];
    };
    memoize.cache = {};
    return memoize;
};
*/

_.delay = function(func, wait){
	var args = Array.prototype.slice.call(arguments, 2);
	return setTimeout(function(){
        return func.apply(null, args);
    }, wait);
}



//todo
//_.defer(function, *arguments) 
//延迟调用function直到当前调用栈清空为止，类似使用延时为0的setTimeout方法


























alength = function(arrays){
	var arg = arguments;
	var list = [];
	for  (var i = 0; i < arg.length; i++){
		list.push(arg[i].length);
	}
	return list;
}




bing = function(a,b){
	if (!(a instanceof Array)) return null;
	var list = a;
	for (var i = 0; i < b.length; i++){
		if (!contains(list, b[i])) list.push(b[i]);
	}
	return list;
}











//object函数
_.ismatch = function(obj, property){
	var keys = _.keys(property)
	for (var i = 0; i < keys.length; i++){
		key = keys[i];
		if (obj[key] !== property[key] || !(key in obj)) return false;
	}
	return true;
};




  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };






























var bb = function (){
	var args = Array.prototype.slice.call(arguments, 2);
	console.log(args);
};




var jia = function(num){
	num = num+1
	return num
};


var test = function(value,key){
		a = value+' value';
		b = key+' key'
		return a+b
};

var via = {
    name:'blar',
    job:'waiter',
    hobby:'sing',
};

var main=[
{name:'babe',job:'singer',},
{name:'adult',job:'singer',},
{name:'bob', job:'waiter',}
]
var work = {job:'singer',}

var list = ['a','b','c','d','e','f','g']


var move = function(list, i){
	for (var k = i-1; k > -1; k--){
		if (list[k] < list[k+1]){
			var small = list[k];
			var big = list[k+1];
			list[k+1] = small;
			list[k] = big
		}else{
			break;
		}
	}
	return list;
} 




jia = function(obj){
	var list = [];
	var add = function(a){
		list.push(a+5);
	}
	for (var i = 0; i < obj.length; i++){
		add(obj[i]);
	}
	return list;
}


/*
dfasfsaf
lalalaaiaiand
sdsad
*/


test = function(){
	var arg = arguments;
	var length = 0;
	for (var i = 0; i < arg.length; i++){
		length = length + arg[i].length;
	}
	return length;
}



reduce(, function(a, b){
	return a.length + b.length
})


arg = function(){
	if (arguments.length == 2) return arguments.length;
}