angular.module('SunWave.theme.components')
    .service('messageAlertService', function($rootScope, $window) {
        this.alertFun = function(x) {
            var lan = $window.sessionStorage.getItem('language');

            if (x == 'must') {
                if (lan == 'chinese') {
                    alert("必须选择一条记录！");
                } else if (lan == 'english') {
                    alert("Must Select One！");
                } else {
                    alert("Must Select One！");
                }
            } else if (x == 'only') {
                if (lan == 'chinese') {
                    alert("只能选择一条记录！");
                } else if (lan == 'english') {
                    alert("Only Select One！");
                } else {
                    alert("Only Select One！");
                }
            } else {
                if (lan == 'chinese') {
                    alert("请选择一个文件！");
                } else if (lan == 'english') {
                    alert("Please select a file!");
                } else {
                    alert("Please select a file!");
                }
            }
        };
        this.confirmFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'sure') {
                if (lan == 'chinese') {
                    if (confirm('确定吗?')) {
                        return true
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('Are you sure?')) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('Are you sure?')) {
                        return true
                    } else {
                        return false;
                    }
                }
            } else if (y == 'modify') {
                if (lan == 'chinese') {
                    if (confirm('确定要修改吗?')) {
                        return true
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('Are you sure you want to modify it?')) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('Are you sure you want to modify it?')) {
                        return true
                    } else {
                        return false;
                    }
                }

            }
        };
        this.confirmFun_alarm = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'sure') {
                if (lan == 'chinese') {
                    if (confirm('该设备含有告警，确定继续吗？')) {
                        return true
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('The device with alarm,are you sure to continue?')) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('The device with alarm,are you sure to continue?')) {
                        return true
                    } else {
                        return false;
                    }
                }
            } else {
                if (confirm('Are you sure you want to continue?')) {
                    return true
                } else {
                    return false;
                }
            }

        };

        this.successFun = function(y, res) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'success') {
                if (lan == 'chinese') {
                    alert('成功！')
                } else if (lan == 'english') {
                    alert('Success!')
                } else {
                    alert('Success!')
                }
            } else if (y == 'failed') {
                if (lan == 'chinese') {
                    alert('失败！' + res)
                } else if (lan == 'english') {
                    alert('Failed!' + res)
                } else {
                    alert('Failed!' + res)
                }
            } else {
                if (lan == 'chinese') {
                    alert('取消！')
                } else if (lan == 'english') {
                    alert('Cancel!')
                } else {
                    alert('Cancel!')
                }
            }
        };
        this.transferFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'not') {
                if (lan == 'chinese') {
                    alert('不允许移动，请检查设备信息是否填写完整。')
                } else if (lan == 'english') {
                    alert('Moving is not allowed, please check whether the device information is completely filled in.')
                } else {
                    alert('Moving is not allowed, please check whether the device information is completely filled in.')
                }
            } else {
                alert('Cancel!')
            }
        };
        this.startRecoverFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'confirm') {
                if (lan == 'chinese') {
                    if (confirm('是否要恢复选定的设备?')) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('Do you want to recover the selected device?')) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('Do you want to recover the selected device?')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else if (y == 'added') {
                if (lan == 'chinese') {
                    if (confirm('如果系统中已经存在同一中继器，则继续添加网元信息')) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('If the same repeater already exists in the system, the network element information will continue to be added')) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('If the same repeater already exists in the system, the network element information will continue to be added')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {
                if (lan == 'chinese') {
                    if (confirm('如果系统中已经存在相同的网元号和设备号组合，是否覆盖已有的网元信息？')) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('If the same combination of network element number and device number already exists in the system, the existing network element information will be overwritten?')) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('If the same combination of network element number and device number already exists in the system, the existing network element information will be overwritten?')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        };
        this.inuseFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'in') {
                if (lan == 'chinese') {
                    alert('所选参数正在使用中，请重新选择')
                } else if (lan == 'english') {
                    alert('The selected parameter is in use, please re select!')
                } else {
                    alert('The selected parameter is in use, please re select!')
                }
            } else {
                if (lan == 'chinese') {
                    alert('所选记录正在使用中，请重新选择')
                } else if (lan == 'english') {
                    alert('The selected item is in use, please re select!')
                } else {
                    alert('The selected item is in use, please re select!')
                }
            }
        };
        this.cancelAlarmFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'cancel') {
                if (lan == 'chinese') {
                    alert('第一次告警确认后才能取消告警！')
                } else if (lan == 'english') {
                    alert('Only after the first alarm is confirmed can it be cancelled!')
                } else {
                    alert('Only after the first alarm is confirmed can it be cancelled!')
                }
            } else if (y == 'confirmed') {
                if (lan == 'chinese') {
                    alert('当前告警不能确认！')
                } else if (lan == 'english') {
                    alert('Current alarm cannot be confirmed!')
                } else {
                    alert('Current alarm cannot be confirmed!')
                }
            }
        };

        this.InconsistentFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'selection') {
                if (lan == 'chinese') {
                    alert('选择状态不一致！')
                } else if (lan == 'english') {
                    alert('Inconsistent selection status')
                } else {
                    alert('Inconsistent selection status')
                }
            } else {

            }
        };

        this.pollingFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'success') {
                if (lan == 'chinese') {
                    alert('所选设备已启用轮询！')
                } else if (lan == 'english') {
                    alert('Polling is turned on for the selected device！')
                } else {
                    alert('Polling is turned on for the selected device！')
                }
            } else if (y == 'failed') {
                if (lan == 'chinese') {
                    alert('所选设备已结束轮询！')
                } else if (lan == 'english') {
                    alert('The selected device has ended polling！')
                } else {
                    alert('The selected device has ended polling！')
                }
            }
        };
        this.authorityFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'no') {
                if (lan == 'chinese') {
                    alert('用户没有权限！')
                } else if (lan == 'english') {
                    alert('The User has no authority！')
                } else {
                    alert('The User has no authority！')
                }
            } else if (y == 'exist') {
                if (lan == 'chinese') {
                    alert('用户已存在！')
                } else if (lan == 'english') {
                    alert('The role name exist!')
                } else {
                    alert('The role name exist!')
                }
            }
        };
        this.roleFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'under') {
                if (lan == 'chinese') {
                    if (confirm('用户所选角色下包含用户，是否继续删除？')) {
                        return true;
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('There are users under the selected role. Continue to delete?')) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('There are users under the selected role. Continue to delete?')) {
                        return true;
                    } else {
                        return false;
                    }
                }
            } else {}
        };
        this.roleSelectFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'enabled') {
                if (lan == 'chinese') {
                    alert('所选角色已启用！')
                } else if (lan == 'english') {
                    alert('The selected role is already enabled!')
                } else {
                    alert('The selected role is already enabled!')
                }
            } else if (y == 'failed') {
                if (lan == 'chinese') {
                    alert('失败。所选记录不能同时包含启用和禁用角色!')
                } else if (lan == 'english') {
                    alert('Failed. The selected record cannot contain both enable and disable roles!')
                } else {
                    alert('Failed. The selected record cannot contain both enable and disable roles！')
                }
            } else {
                if (lan == 'chinese') {
                    alert('所选角色已停用!')
                } else if (lan == 'english') {
                    alert('The selected role has been deactivated!')
                } else {
                    alert('The selected role has been deactivated！')
                }
            }
        };
        this.userAlertFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'modifyOwn') {
                if (lan == 'chinese') {
                    alert('您不能修改自己的权限！')
                } else if (lan == 'english') {
                    alert('you cannot modify your own permissions!')
                } else {
                    alert('you cannot modify your own permissions!')
                }
            } else if (y == 'Management') {
                if (lan == 'chinese') {
                    alert('管理员和超级管理员不能删除！')
                } else if (lan == 'english') {
                    alert('Management And SuperManagement Can Not Delete!')
                } else {
                    alert('Management And SuperManagement Can Not Delete!')
                }
            } else {
                if (lan == 'chinese') {
                    alert('所选用户状态不一致或已启用。请重新选择')
                } else if (lan == 'english') {
                    alert('The selected user status is inconsistent or has been enabled. Please select again！')
                } else {
                    alert('The selected user status is inconsistent or has been enabled. Please select again！')
                }
            }
        };
        this.userPasswordFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'required') {
                if (lan == 'chinese') {
                    alert('需要密码！')
                } else if (lan == 'english') {
                    alert('Password required!')
                } else {
                    alert('Password required!')
                }
            } else if (y == 'inconsistent') {
                if (lan == 'chinese') {
                    alert('两次输入不一致')
                } else if (lan == 'english') {
                    alert('The two inputs are inconsistent')
                } else {
                    alert('The two inputs are inconsistent')
                }
            } else {
                if (lan == 'chinese') {
                    alert('两次输入不一致')
                } else if (lan == 'english') {
                    alert('The two inputs are inconsistent')
                } else {
                    alert('The two inputs are inconsistent')
                }
            }
        };
        this.detailSetFun = function(y, res) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'setvalue') {
                if (lan == 'chinese') {
                    alert('请设置值！')
                } else if (lan == 'english') {
                    alert('please set value!')
                } else {
                    alert('please set value!')
                }
            } else if (y == 'set') {
                if (lan == 'chinese') {
                    alert('正在设置')
                } else if (lan == 'english') {
                    alert('Set!')
                } else {
                    alert('Set!')
                }
            } else {
                if (lan == 'chinese') {
                    alert('设置失败！')
                } else if (lan == 'english') {
                    alert('Set Failed!' + res)
                } else {
                    alert('Set Failed!' + res)
                }
            }
        };
        this.detailQueryFun = function(y, res) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'query') {
                if (lan == 'chinese') {
                    alert('请查询值！')
                } else if (lan == 'english') {
                    alert('Query!')
                } else {
                    alert('Query!')
                }
            } else if (y == 'failed') {
                if (lan == 'chinese') {
                    alert('正在设置')
                } else if (lan == 'english') {
                    alert('Query Failed!' + res)
                } else {
                    alert('Query Failed!' + res)
                }
            } else {
                // if (lan == 'failed') {
                //     alert('设置失败！')
                // } else if (lan == 'english') {
                //     alert('Set Failed!')
                // } else {
                //     alert('Set Failed!')
                // }
            }
        };
        this.detailResetFun = function(y, res) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'AU') {
                if (lan == 'chinese') {
                    alert('只有AU可以重置！')
                } else if (lan == 'english') {
                    alert('Only AU Can Reset!')
                } else {
                    alert('Only AU Can Reset!')
                }
            } else if (y == 'set') {
                if (lan == 'chinese') {
                    alert('正在设置')
                } else if (lan == 'english') {
                    alert('Set!')
                } else {
                    alert('Set!')
                }
            } else {
                if (lan == 'failed') {
                    alert('设置失败！')
                } else if (lan == 'english') {
                    alert('Set Failed!' + res)
                } else {
                    alert('Set Failed!' + res)
                }
            }
        };

        this.inUseDeleteFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'inuse') {
                if (lan == 'chinese') {
                    alert('已经被使用，不允许删除！')
                } else if (lan == 'english') {
                    alert('In use, cannot be deleted!')
                } else {
                    alert('In use, cannot be deleted!')
                }
            } else {
                if (lan == 'chinese') {
                    alert('')
                } else if (lan == 'english') {
                    alert('')
                } else {
                    alert('')
                }
            }
        };

        this.alarmClearFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'cantclear') {
                if (lan == 'chinese') {
                    alert('当前告警不能操作！')
                } else if (lan == 'english') {
                    alert('The alarm can not operation!')
                } else {
                    alert('The alarm can not operation!')
                }
            } else {
                if (lan == 'chinese') {
                    alert('')
                } else if (lan == 'english') {
                    alert('')
                } else {
                    alert('')
                }
            }
        };

        this.lengthFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == '') {
                if (lan == 'chinese') {
                    alert('请确认填写项是否正确！')
                } else if (lan == 'english') {
                    alert('Please confirm whether the entry is correct!')
                } else {
                    alert('Please confirm whether the entry is correct!')
                }
            } else {
                if (lan == 'chinese') {
                    alert('请确认填写项是否正确！')
                } else if (lan == 'english') {
                    alert('Please confirm whether the entry is correct!')
                } else {
                    alert('Please confirm whether the entry is correct!')
                }
            }
        };

        this.sureFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');
            if (y == 'sure') {
                if (lan == 'chinese') {
                    if (confirm('确定继续操作吗？')) {
                        return true
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('Are you sure you want to continue?')) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('Are you sure you want to continue?')) {
                        return true
                    } else {
                        return false;
                    }
                }
            } else if (y == 'modify') {
                if (lan == 'chinese') {
                    if (confirm('确定要修改吗?')) {
                        return true
                    } else {
                        return false;
                    }
                } else if (lan == 'english') {
                    if (confirm('Are you sure you want to modify it?')) {
                        return true
                    } else {
                        return false;
                    }
                } else {
                    if (confirm('Are you sure?if the node has children, it will be deleted together')) {
                        return true
                    } else {
                        return false;
                    }
                }

            }
        };

        this.dbLoadTips = function(y) {
            var lan = $window.sessionStorage.getItem('language');

            if (y == 'success') {
                if (lan == 'chinese') {
                    alert('恢复成功！请与管理员联系以重新启动系统。')
                } else if (lan == 'english') {
                    alert('Restored successfully! Please contact the administrator to restart the system.')
                } else {
                    alert('Restored successfully! Please contact the administrator to restart the system.')
                }
            } else {
                if (lan == 'chinese') {
                    alert('恢复失败！')
                } else if (lan == 'english') {
                    alert('Restore failed!')
                } else {
                    alert('Restore failed!')
                }
            }
        };

        this.topoSearchFun = function(y) {
            var lan = $window.sessionStorage.getItem('language');
            if (lan == 'chinese') {
                alert('输入内容不可超过25字符！')
            } else if (lan == 'english') {
                alert('The input content cannot exceed 25 characters!')
            } else {
                alert('The input content cannot exceed 25 characters!')
            }

        };
    });