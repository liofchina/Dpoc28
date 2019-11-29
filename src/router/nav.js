export let menuList = [{
  icon: "el-icon-apple",
  type: "1",
  url: "",
  parentId: "1",
  menuName: "Holder",
  menuId: "0DE4B44B8385418EA06EA22D034F32B6",
  list: [
    {
      icon: "",
      url: "holder/did/index",
      menuName: "DID管理",
      type: "1",
      orderNum: 0,
      menuId: "C593F2C5693342F9AA86A25C451F10C0",
      parentId: "0DE4B44B8385418EA06EA22D034F32B6"
    },
    // {
    //   icon: "",
    //   url: "holder/cert/index",
    //   menuName: "证书清单",
    //   type: "1",
    //   orderNum: 1,
    //   menuId: "1DF3B58FF2EE4D99AFB5299907F3D41E",
    //   parentId: "0DE4B44B8385418EA06EA22D034F32B6"
    // },
    {
      icon: "",
      url: "holder/apply/index",
      menuName: "申请进度",
      type: "1",
      orderNum: 2,
      menuId: "BD7308B7B85E47639B0AAFCA4578FDFE",
      parentId: "0DE4B44B8385418EA06EA22D034F32B6"
    },
    {
      icon: "",
      url: "holder/verify/index",
      menuName: "验证请求",
      type: "1",
      orderNum: 3,
      menuId: "BD7308B7B85E47639B0AAFCA45FD78FE",
      parentId: "0DE4B44B8385418EA06EA22D034F32B6"
    }
  ]
},
  {
    icon: "el-icon-cherry",
    type: "1",
    url: "",
    parentId: "1",
    menuName: "Issuer",
    menuId: "0DE4B44B8385418EA06EA22D034F32B1",
    list: [
      {
        icon: "",
        url: "issuer/apply/index",
        menuName: "证书申请列表",
        type: "1",
        orderNum: 0,
        menuId: "C593F2C5693342F9AA86A34C451F10C0",
        parentId: "0DE4B44B8385418EA06EA22D034F32B1"
      },
      {
        icon: "",
        url: "issuer/cert/index",
        menuName: "发证管理",
        type: "1",
        orderNum: 1,
        menuId: "C593F2C5693342F9AA86A34C451F12C1",
        parentId: "0DE4B44B8385418EA06EA22D034F32B1"
      }
    ]
  },
  {
    icon: "el-icon-ice-cream-round",
    type: "1",
    url: "",
    parentId: "1",
    menuName: "Verifier",
    menuId: "0DE4B44B8385418EA06EA22D034F32B2",
    list: [
      // {
      //   icon: "",
      //   url: "verifier/index",
      //   menuName: "检索DID进入页",
      //   type: "1",
      //   orderNum: 0,
      //   menuId: "C593F2C5693342F9AA86A34C451F10C1",
      //   parentId: "0DE4B44B8385418EA06EA22D034F32B2"
      // },
      {
        icon: "",
        url: "verifier/did/index",
        menuName: "检索DID",
        type: "1",
        orderNum: 1,
        menuId: "C593F2C5693342F9AA86A34C451F12C2",
        parentId: "0DE4B44B8385418EA06EA22D034F32B2"
      },
      {
        icon: "",
        url: "verifier/verify/index",
        menuName: "证书效验",
        type: "1",
        orderNum: 2,
        menuId: "C593F2C5693342F9AA86A34C451F12C3",
        parentId: "0DE4B44B8385418EA06EA22D034F32B2"
      }
    ]
  }
];
