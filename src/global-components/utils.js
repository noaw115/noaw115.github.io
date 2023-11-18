export const limitNumber = (number, upper, lower) => {
  if (number < upper && number > lower) {
    return number;
  } else if (number >= upper) {
    return upper;
  } else if (number <= lower) {
    return lower;
  }
};
const widthFactor = document.body.clientWidth / 100;

export class PageData {
  constructor() {
    this.lengthMap = [
      { descri: '门的页面', length: 100, blur: false, mobileLength: 110 },
      {
        descri: '视差滚动NOA',
        length: 60,
        mobileLength: 50,
        blur: true,
        custom: {
          delayTime: 2, //先等这段时间
          animationDuration: 2, //再花这段时间走动画
        },
      },
      {
        descri: '详细介绍页',
        length: 40,
        mobileLength: 100,
        blur: true,
        custom: {
          delayTime: 2, //先等这段时间
          animationDuration: 2, //再花这段时间走动画
          content: {
            largeTitle: `Web Design/ App Design/ Interactive Design/ Illustration/<br/> Branding/ Art Direction/ Design Consultancy/ 3D <br/>Prototyping/ Package Design
                        `,
            text: `
      I'm Noa, a creative designer and illustrator with a dash of hardcore otaku passion.
      <br/><br/>
To me, design is more than just a profession; it's an exhilarating adventure, much like a video game. I approach each project like a quest, diving deep into my clients' goals, unearthing the stories they want to tell, and challenging myself to connect the dots using a myriad of interactive methods, all in service of captivating the target audience.
      `,
            smallText: `
        Beyond my design prowess, I also have a few unique talents up my sleeve.
        When I'm not crafting compelling visuals, you might find me gliding on the ice as a figure skating enthusiast or, thanks to my extraordinary memory, engaging in deep discussions about anime. 
      `,
            leftEmail: 'noawen115@gmail.com',
          },
        },
      },
      { descri: '山中之门页', length: 50, blur: true, mobileLength: 100 },
      { descri: '联系信息', length: 30, blur: true, mobileLength: 100 },
    ];
  }

  calTotalVw = () => {
    // 计算总长度
    let res = 0;
    this.lengthMap.forEach((item) => {
      res += item.length;
    });
    return res;
  };

  getPageField = (descri, field) => {
    // 找到某一页的属性，第二项代表属性名，不传则是所有属性，传index则是返回index
    let res;
    this.lengthMap.forEach((item, index) => {
      if (item.descri === descri) {
        if (!field) {
          res = item;
        } else if (field === 'index') {
          res = index;
        } else {
          res = item[field];
        }
      }
    });
    return res;
  };

  calStartToPageVw = (descri) => {
    // 找到某一页的起点长度（vw长度）
    let res = 0;
    let addFlag = true;
    this.lengthMap.forEach((item) => {
      if (item.descri === descri) {
        addFlag = false;
      }
      if (addFlag) res += item.length;
    });
    return res;
  };

  calSnapArray = () => {
    // 计算吸附列表 是一个[0,width1,width1+width2,...]这样的列表（实际长度）
    let array = [];
    this.lengthMap.forEach((item) => {
      array.push(this.calStartToPageVw(item.descri) * widthFactor);
    });
    // console.log('snapArray', array);
    return array;
  };

  calBlurArray = (offset = 0) => {
    // 计算高斯模糊列表，是一个[width1-100,width1+width2-100,width1+width2+width3-100,...]这样的列表（实际长度）
    let array = [];
    this.lengthMap.forEach((item) => {
      array.push(
        (this.calStartToPageVw(item.descri) +
          this.getPageField(item.descri, 'length') -
          100) *
          widthFactor +
          offset
      );
    });
    // console.log('calBlurArray', array);
    return array;
  };
}

export const handleEmail = (e) => {
  e.preventDefault();
  const email = 'oawen115@gmail.com'; // 收件人的电子邮件地址
  const subject = ''; // 电子邮件的主题
  const body = ''; // 电子邮件的正文内容
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl; // 调用电子邮件客户端
}
