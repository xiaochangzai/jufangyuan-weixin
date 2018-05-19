// var urlHeader = "http://localhost:8090/jufangyuan/";
var urlHeader = "https://qaq.jfy108.net/jufangyuan/";
module.exports = {
  getSolveId: urlHeader + "getSolveId.do", // 获取一个做题的id
  getQuestionsAll: urlHeader + "getQuestionsAll.do",	// 获取所有的题目
  addQuegiver: urlHeader + "addQuegiver.do", // 提交答案
  getQuestionsByGiverId: urlHeader + "getQuestionsByGiverId.do", // 获取朋友出的题目
  addQuedealer: urlHeader + "addQuedealer.do", // 添加答题记录
  getQuedealByGivId: urlHeader + "getQuedealByGivId.do", // 根据出题id获取所有答题分数
  getGiverInfo: urlHeader + "getGiverInfo.do", // 获取出题人的信息
  addUser: urlHeader + "addUser.do", // 添加用户信息
  getGiverListByUser: urlHeader + "getGiverListByUser.do", // 我的出题记录
  getDealByUser: urlHeader + "getDealByUser.do", // 获取我的做题记录
  getDealById: urlHeader + "getDealById.do", // 根据id获得我做的题
  getUserOpenId: urlHeader + "getUserOpenId.do",// 获取用户open Id
  pay: urlHeader + "pay.do",  // 支付
  getWxCode: urlHeader + "getWxCode.do",  // 获取小程序码
  updateDeal: urlHeader + "updateDeal.do"
}
