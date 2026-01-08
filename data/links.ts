export type LinkItem = {
    title: string;
    url: string;
    description: string;
    icon?: string;
};

export type Category = {
    id: string;
    name: string;
    color: string; // Tailwind class component or hex
    items: LinkItem[];
};

export const linkData: Category[] = [
    {
        id: "drive",
        name: "网盘资源",
        color: "bg-green-400",
        items: [
            { title: "迅雷电影天堂", url: "https://xunlei8.cc/", description: "经典的高清影视资源下载站。" },
            { title: "Switch520", url: "https://www.gamer520.com/", description: "Switch游戏资源下载站。" },
            { title: "秒搜", url: "https://miaosou.fun/", description: "轻量级的网盘资源搜索引擎。" },
            { title: "兄弟盘", url: "https://www.xiongdipan.com/", description: "综合性网盘资源分享社区。" },
            { title: "趣盘搜", url: "https://pan.funletu.com/", description: "专注夸克资源搜索。" },
            { title: "UP云搜", url: "https://www.upyunso.com/", description: "聚合多平台网盘资源搜索。" },
            { title: "海绵小站", url: "https://www.hmxz.org", description: "优质的影视与软件资源分享。" },
            { title: "磁力柠檬", url: "https://lemonuo.top/", description: "强力的磁力链接搜索引擎。" },
            { title: "凌风云", url: "https://www.lingfengyun.com/", description: "专业的网盘资源搜索工具。" },
            { title: "云盘666", url: "https://pan666.net/", description: "专业的夸克与阿里网盘资源搜索。" },
            { title: "混合盘搜索", url: "https://hunhepan.com/", description: "百度网盘, 夸克网盘, 阿里云盘资源搜索网站。" },
            { title: "影搜", url: "https://yingso.fun/", description: "开放纯粹的资源搜索平台。" },
        ]
    },
    {
        id: "design",
        name: "设计办公",
        color: "bg-pink-400", // More vibrant color
        items: [
            { title: "Office模板", url: "https://www.officeplus.cn/", description: "微软官方Office素材模板下载。" },
            { title: "搞定设计", url: "https://www.gaoding.com/", description: "多场景在线平面设计工具。" },
            { title: "千库网", url: "https://588ku.com/", description: "免费背景图与素材下载。" },
            { title: "图怪兽", url: "https://818ps.com", description: "在线作图神器，会打字就能作图。" },
            { title: "站酷", url: "https://www.zcool.com.cn/", description: "深耕中国设计领域的互动平台。" },
            { title: "阿里图标", url: "https://www.iconfont.cn/", description: "阿里巴巴矢量图标库。" },
            { title: "IconFinder", url: "https://www.iconfinder.com/", description: "全球最大的付费图标搜索库。" },
            { title: "优设教程", url: "https://uiiiuiii.com/", description: "免费专业的设计师学习平台。" },
            { title: "文档在线转换", url: "https://xpdf.net/", description: "免费在线PDF与办公文档转换。" },
            { title: "在线PS", url: "https://www.photopea.com/", description: "浏览器端的 PhotoShop。" },
            { title: "知犀(思维导图)", url: "https://www.zhixi.com/", description: "完全免费的思维导图工具。" },
            { title: "IconPark", url: "https://iconpark.oceanengine.com/official", description: "字节跳动出品的高质量图标库。" },
            { title: "ColorSpace", url: "https://mycolor.space/", description: "极简的渐变色生成与推荐。" },
            { title: "字由", url: "https://www.hellofont.cn/", description: "设计师必备的字体管理工具。" },
            { title: "PR模板网", url: "https://prmuban.com/", description: "免费精选 Premiere 剪辑模板。" },
            { title: "AE模板网", url: "https://aemuban.com/", description: "After Effects 特效模板资源。" },
            { title: "免费商用字体", url: "https://www.fonts.net.cn/commercial-free/fonts-zh-1.html", description: "字体下载与免费商用授权查询。" },
            { title: "Magic Eraser", url: "https://magiceraser.pro/zh", description: "AI 智能图片去水印与消除。" },
        ]
    },
    {
        id: "dev",
        name: "开发工具",
        color: "bg-blue-400",
        items: [
            { title: "HTML在线运行", url: "https://c.runoob.com/front-end/61/", description: "菜鸟教程提供的在线HTML编辑器。" },
            { title: "MD编辑器", url: "https://www.lylme.com/html", description: "简洁好用的在线Markdown编辑器。" },
            { title: "在线代码格式化", url: "https://tool.oschina.net/codeformat/html/", description: "OSChina提供的代码美化与格式化工具。" },
            { title: "JS混淆器", url: "http://tool.chinaz.com/tools/jscodeconfusion.aspx", description: "站长之家JS代码混淆加密工具。" },
            { title: "站长工具", url: "http://tool.chinaz.com/", description: "站长必备的SEO与网站综合查询平台。" },
            { title: "W3school", url: "http://www.w3school.com.cn/", description: "全球最大的WEB技术教程网站。" },
            { title: "Github", url: "https://github.com/", description: "全球最大的开源代码托管平台。" },
            { title: "码云Gitee", url: "https://gitee.com/", description: "国内优秀的Git代码托管平台。" },
            { title: "Linux命令查询", url: "https://linux.lylme.com/", description: "Linux命令大全搜索工具。" },
            { title: "CSDN", url: "https://www.csdn.net/", description: "专业IT技术社区。" },
            { title: "CdnJs", url: "https://cdnjs.com/", description: "著名的免费CDN服务。" },
            { title: "字节跳动CDN", url: "https://cdn.bytedance.com/", description: "字节跳动提供的静态资源公共库。" },
            { title: "Font Awesome", url: "https://fontawesome.com/icons?https://fontawesome.com/", description: "流行的图标字体库。" },
            { title: "MSDN我告诉你", url: "https://msdn.itellyou.cn/", description: "纯净的原版软件下载站。" },
            { title: "腾讯云", url: "https://curl.qcloud.com/wi7vb9RR", description: "腾讯打造的云计算服务平台。" },
            { title: "阿里云", url: "https://www.aliyun.com/activity/daily/bestoffer?userCode=cu8pd6xq", description: "全球领先的云计算服务平台。" },
            { title: "Vue.js", url: "https://cn.vuejs.org", description: "渐进式JavaScript框架。" },
            { title: "PHP中文网", url: "https://www.php.cn", description: "免费的PHP学习与培训平台。" },
            { title: "菜鸟教程", url: "https://www.runoob.com/", description: "学的不仅是技术，更是梦想。" },
            { title: "微信开放文档", url: "https://developers.weixin.qq.com/doc/", description: "微信开发者官方文档中心。" },
            { title: "EdgeOne Pages", url: "https://edgeone.ai/zh/products/pages", description: "腾讯云EdgeOne边缘托管服务。" },
        ]
    },
    {
        id: "ai",
        name: "AI工具",
        color: "bg-purple-400",
        items: [
            { title: "抖音AI豆包", url: "https://www.doubao.com/", description: "字节跳动出品的智能AI助手。" },
            { title: "文心一言", url: "https://yiyan.baidu.com/", description: "百度全新一代知识增强大语言模型。" },
            { title: "DeepSeek", url: "https://www.deepseek.com/", description: "深度求索，探索通往AGI的道路。" },
            { title: "AiPPT", url: "https://www.aippt.cn/", description: "AI一键生成高质量PPT。" },
            { title: "智谱清言", url: "https://chatglm.cn/", description: "基于ChatGLM大模型的智能助手。" },
            { title: "讯飞绘镜", url: "https://typemovie.art/", description: "科大讯飞推出的AI绘画工具。" },
            { title: "白日梦AI", url: "https://aibrm.com/", description: "AI文生图与视频创作平台。" },
            { title: "美图设计室", url: "https://www.designkit.com/", description: "AI智能商用设计工具。" },
            { title: "堆友", url: "https://d.design/", description: "阿里出品的3D设计资源与AI工具。" },
            { title: "AI工具集", url: "https://ai-bot.cn/", description: "收录全球优质AI工具。" },
            { title: "Kimi", url: "https://kimi.moonshot.cn/", description: "月之暗面科技推出的智能助手。" },
            { title: "ChatGPT", url: "https://chat.openai.com/", description: "OpenAI 研发的聊天机器人程序。" },
            { title: "纳米AI搜索", url: "https://www.n.cn", description: "新一代AI搜索引擎。" },
            { title: "360AI搜索", url: "https://www.sou.com/?src=360so_index", description: "360推出的AI搜索工具。" },
            { title: "秘塔AI搜索", url: "https://metaso.cn/", description: "没有广告的AI搜索。" },
            { title: "腾讯元宝", url: "https://yuanbao.tencent.com", description: "腾讯混元大模型官方应用。" },
            { title: "通义", url: "https://tongyi.ai", description: "阿里通义千问大模型。" },
        ]
    },
    {
        id: "tools",
        name: "在线工具",
        color: "bg-orange-400",
        items: [
            { title: "在线工具大全", url: "https://tool.lu/?refuid=mdn", description: "程序员的百宝箱，常用工具集合。" },
            { title: "IP查询", url: "https://ip.cn/", description: "专业的IP地址查询与定位服务。" },
            { title: "谷歌翻译", url: "https://translate.google.cn/?hl=zh-CN", description: "Google提供的免费在线翻译服务。" },
            { title: "有道翻译", url: "https://fanyi.youdao.com/", description: "网易出品的专业在线翻译工具。" },
            { title: "微PE工具", url: "http://www.wepe.com.cn/", description: "纯净无广告的系统维护工具箱。" },
            { title: "在线Ping", url: "https://ping.chinaz.com/", description: "站长之家全国各地Ping检测。" },
            { title: "ICP备案查询", url: "https://icp.chinaz.com/", description: "快速查询网站的ICP备案信息。" },
            { title: "爱站网", url: "https://www.aizhan.com/", description: "百度权重与网站流量查询工具。" },
            { title: "PDF提取图片", url: "http://www.pdfdo.com/pdf-extract-image.aspx", description: "简单好用的PDF图片提取工具。" },
            { title: "在线文本比对", url: "https://tool.lu/diff/", description: "在线代码与文本差异比对工具。" },
            { title: "在线计算器", url: "https://www.jisuana.com", description: "功能强大的科学计算器。" },
            { title: "站长工具", url: "http://www.aizhan.com", description: "综合性网站运营查询与分析平台。" },
            { title: "测速网", url: "https://www.speedtest.cn/", description: "专业的网络速度测试工具。" },
            { title: "在线JSON工具", url: "https://www.json.cn", description: "JSON格式化、解析、压缩与编辑器。" },
            { title: "备案查询", url: "https://www.beianx.cn/search", description: "公安部备案与ICP备案综合查询。" },
            { title: "条形码生成", url: "https://barcode-maker.com/zh", description: "免费在线条形码生成器。" },
            { title: "免费HLS播放器", url: "https://edgeone.ai/zh/tools/hls-player", description: "在线测试HLS/M3U8流媒体播放。" },
            { title: "在线图片格式转换器", url: "https://edgeone.ai/zh/tools/image-converter/jpg-to-png", description: "高效的图片格式转换工具。" },
        ]
    }
];
