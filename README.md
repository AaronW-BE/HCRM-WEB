# H-CRM

### 自定义指令
* v-permission: 权限测试指令
```vuejs
<a-button v-permission="['order:create']" >创建订单</a-button>
```
指令自动查询用户是否拥有指令权限列表中的权限，若无则在dom中删除此元素。
位置: [permission.js](src/dicrectives/permission.js)