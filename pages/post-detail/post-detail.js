// pages/post-detail/post-detail.js

import {postList} from '../../data/data'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _pid: null,
    collected: false,
    isPlaying: false,
    _postsCollected: {},
    _mgr: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pid = options.pid;
    const data = postList[pid];
    this.data._pid = pid;
    this.setData(data);

    const postsCollected = wx.getStorageSync('posts_collected');
    this.data._postsCollected = postsCollected;
    let collected = postsCollected[this.data._pid];
    const mgr = wx.getBackgroundAudioManager();
    mgr.onPlay(this.onMusicStart)
    mgr.onPause(this.onMusicPause)
    if(collected === undefined){
      collected = false;
    }
    this.setData({
      collected,
      _mgr: mgr,
      isPlaying:  this.currentMusicIsPlaying()
    })
  },
  
  currentMusicIsPlaying(){
    if(app.gIsPlayingPostId === this.data._pid && app.gIsPlayingMusic){
      return true
    }else {
      return false
    }

  },

  onShare(event){
 wx.showActionSheet({
   itemList: ['分享到QQ', '分享到微信'],
 })
  },
  onMusicStart(event){
    const mgr = this.data._mgr
    mgr.src = this.data.music.url;
    mgr.title = this.data.music.title;
    mgr.coverImgUrl = this.data.music.coverImg;
   this.setData({
    isPlaying: true
   })
   app.gIsPlayingMusic = true;
   app.gIsPlayingPostId = this.data._pid;
  },
  onMusicPause(event){
    const mgr = this.data._mgr
    mgr.pause();
   this.setData({
    isPlaying: false
   })
   app.gIsPlayingMusic = false;
   app.gIsPlayingPostId = -1;
  },
  onCollect(event){
    let postsCollected = this.data._postsCollected;
    postsCollected[this.data._pid] = !this.data.collected;
    this.setData({
      collected: !this.data.collected
    })
    wx.setStorageSync('posts_collected', postsCollected);
    const title =postsCollected[this.data._pid] ? '收藏成功' : '取消成功';
    wx.showToast({
      title: title,
      duration: 1000
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})