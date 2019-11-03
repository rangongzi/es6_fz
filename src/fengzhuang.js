require('./style.less');
{
  class Transform{
    constructor (select){
      this.ex = document.querySelector(select);
      this._queue = [];
      this._transform = {
        'translate' : '',
        'rotate' : '',
        'scale' : ''
      };
      this.defaultTime = Transform.config.defaultTime;
      this.ex.style.transition = 'all 1s'
    }
    // 位移
    translate(value,time){
     return this._add('translate',value,time);
    }
    // 缩放
    scale(value,time){
      return this._add('scale',value,time);
    }
    // 形变
    rotate(value,time){
     return this._add('rotate',value,time);
    }
    _add(type,value,time=this.defaultTime){
      this._queue.push({
        type,
        value,
        time
      })
      return this;
    }
    _done(){
      this._start();
    }
    _start(){
      if(!this._queue.length) return;
      setTimeout(()=>{
        const info = this._queue.shift();
        this.ex.style.transition = `all ${info.time/1000}s`;
        this.ex.style.transform = this._getTransform(info)
        setTimeout(()=>{
          this._start();
        },info.time)
      },0)
    }
    _getTransform({type,value,time}){
      const _tsf = this._transform;
      switch (type) {
        case 'translate':
          _tsf.translate = `translate(${value})`;
          break;
        case 'scale':
          _tsf.scale = `scale(${value})`;
          break;
        case 'rotate':
          _tsf.rotate = `rotate(${value})`;
          break;
      }
      return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`
    }
  }

  //三个动作同时进行
  class MulityTransform extends Transform{
    mulity(value,time){
      return this._add('mulity',value,time);
    }
    sleep(value){
      return this._add('sleep','',value)
    }
    _getTransform({type,value,time}){
      const _tsf = this._transform;
      switch (type) {
        case 'translate':
          _tsf.translate = `translate(${value})`;
          break;
        case 'scale':
          _tsf.scale = `scale(${value})`;
          break;
        case 'rotate':
          _tsf.rotate = `rotate(${value})`;
          break;
        case 'mulity':
          value.forEach(item=>{
            this._getTransform(item);
          })
          break;
        case 'sleep':
          break;
      }
      return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`
    }
  }
  Transform.config = {
      defaultTime : 1000
  }
  Transform.config.defaultTime = 2000;
  const trans = new MulityTransform('.wrapper');
  trans
    .mulity([
      {
        type: 'rotate',
        value: '360deg'
      },
      {
        type:'scale',
        value: 1.5
      }
    ])
    .sleep(10)
    .mulity([
      {
        type:'scale',
        value: .5
      },
      {
        type: 'rotate',
        value: '180deg'
      },
      {
        type:'translate',
        value:'100px,100px'
      }
    ])
    ._done()

  // console.log(trans)
}




