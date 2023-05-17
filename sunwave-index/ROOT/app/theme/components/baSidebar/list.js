$scope.menuItems = [{
    icon: "ion-ios-home",
    level: 0,
    name: "dashboard",
    order: 0,
    stateRef: "dashboard",
    subMenu: null,
    title: "Homepage"
}, {
    icon: "fa fa-globe",
    level: 0,
    name: "map",
    order: 0,
    stateRef: "map",
    subMenu: null,
    title: "Map",
    button: [{
        name: 'search',
        class: 'btn btn-mapS btn-sm',
        icon: 'fa fa-search',
        click: 'search();'
    }]
}, {
    icon: "fa fa-sitemap",
    level: 0,
    name: "top",
    order: 0,
    stateRef: "top",
    subMenu: null,
    title: "Topological Map",
    button: [{
        name: 'ResetCondition',
        class: 'btn btn-reset btn-xs',
        icon: 'fa fa-rotate-right pad0-4',
        click: 'reset();'
    }, {
        name: 'refreshTOPO',
        class: 'btn btn-info btn-xs',
        icon: null,
        click: 'refresh();'
    }]
}, {
    icon: "fa fa-hdd-o",
    level: 0,
    name: "DatabaseBackUp",
    title: "DatabaseBackUp",
    order: 3,
    stateRef: "DatabaseBackUp",
    subMenu: [{
        icon: "fa fa-hdd-o",
        level: 1,
        name: "DatabaseBackUp.backupSetting",
        order: 100,
        stateRef: "DatabaseBackUp.backupSetting",
        title: "BackupSetting",
        button: [{
            name: 'Determine',
            type: 'submit',
            class: 'btn btn-sm btn-info',
            icon: null,
            click: null
        }, {
            name: 'Cancel',
            type: 'button',
            class: 'btn btn-sm btn-reset',
            icon: null,
            click: null
        }]
    }, {
        icon: "fa fa-hdd-o",
        level: 1,
        name: "DatabaseBackUp.databaseLoad",
        order: 100,
        stateRef: "DatabaseBackUp.databaseLoad",
        title: "DatabaseLoad",
        button: [{
            name: 'Determine',
            type: 'submit',
            class: 'btn btn-sm btn-green',
            icon: 'icon-plus',
            click: 'importBinlog();'
        }]

    }]
},


{
    icon: "fa fa-adjust",
    level: 0,
    name: "SeacurityManagement",
    order: 2,
    stateRef: "SeacurityManagement",
    subMenu: null,
    title: "Seacurity Management",
    subMenu: [{
        level: 1,
        name: "SeacurityManagement.IpblackList",
        order: 100,
        stateRef: "SeacurityManagement.IpblackList",
        title: "Ipblack List",
        button_do: [{
            name: 'Save',
            class: 'btn btn-info btn-sm',
            icon: null,
            click: 'save();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm',
            icon: null,
            click: 'reset();'
        }]
    }, {
        level: 1,
        name: "SeacurityManagement.seacurityRules",
        order: 100,
        stateRef: "SeacurityManagement.seacurityRules",
        title: "SeacurityRules",
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: '"btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModify();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'viewItem();'
        }],
        button: [{
            name: null,
            class: 'btn btn-sm btn-success btn-raised',
            icon: 'fa fa-search',
            click: 'search();'
        }]

    }]

},


{
    icon: "ion-android-laptop",
    level: 0,
    name: "sysManagement",
    order: 100,
    stateRef: "sysManagement",
    subMenu: [{
        icon: undefined,
        level: 1,
        name: "sysManagement.sysAnnouncement",
        order: 0,
        stateRef: "sysManagement.sysAnnouncement",
        title: "Announcement",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toShowItem();'
        }]
    }, {
        icon: undefined,
        level: 1,
        name: "sysManagement.vendorManagement",
        order: 0,
        stateRef: "sysManagement.vendorManagement",
        title: "vendorManagement",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }]
    }],
    title: "System Management"

},
{
    icon: "fa fa-user",
    level: 0,
    name: "Authority",
    order: 100,
    stateRef: "Authority",
    subMenu: [{
        icon: undefined,
        level: 1,
        name: "Authority.area",
        order: 0,
        stateRef: "Authority.area",
        title: "Area Management"
    }, {
        icon: undefined,
        level: 1,
        name: "Authority.safe",
        order: 0,
        stateRef: "Authority.safe",
        title: "User Management",
        button: [{
            name: null,
            class: 'btn btn-sm btn-success btn-raised',
            icon: 'fa fa-search',
            click: 'search();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify Password',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'toModifyPassword();'
        }, {
            name: 'Area Authority',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'getAreaTree();'
        }, {
            name: 'Role Authority',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'getRole();'
        }, {
            name: 'Enable',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'openRole();'
        }, {
            name: 'Disable',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'stopRole();'
        }]
    }, {
        icon: undefined,
        level: 1,
        name: "Authority.role",
        order: 0,
        stateRef: "Authority.role",
        title: "Role Management",
        button: [{
            name: null,
            class: 'btn btn-warning btn-raised btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModify();'
        }, {
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Open',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'openRole();'
        }, {
            name: 'Stop',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'stopRole();'
        }, {
            name: 'Menu Authority',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'getMenuTree();'
        }]
    }, {
        icon: undefined,
        level: 1,
        name: "Authority.safeManage",
        order: 0,
        stateRef: "Authority.safeManage",
        title: "Seacurity Management",
        button_do: [{
            name: 'Save',
            class: 'btn btn-info btn-sm',
            icon: null,
            click: 'save();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm',
            icon: null,
            click: 'reset();'
        }]
    }, {
        icon: undefined,
        level: 1,
        name: "Authority.organization",
        order: 1,
        stateRef: "Authority.organization",
        title: "Menu Management"
    }],
    title: "Authority Management"
},
{
    icon: "fa fa-hdd-o",
    level: 0,
    name: "deviceManagement",
    order: 100,
    stateRef: "deviceManagement",
    subMenu: [{
        icon: undefined
        level: 1
        name: "deviceManagement.deviceList"
        order: 0
        stateRef: "deviceManagement.deviceList"
        title: "Device List",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'addItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'editItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'viewItem();'
        }, {
            name: 'Query Device',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'queryDevice();'
        }, {
            name: 'Not In Service',
            class: 'btn btn-blue btn-raised btn-pd',
            icon: null,
            click: 'NotInService();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "deviceManagement.NotInService"
        order: 0
        stateRef: "deviceManagement.NotInService"
        title: "Not In Service",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'editItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Query Device',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'queryDevice();'
        }, {
            name: 'In Operation',
            class: 'btn btn-blue btn-raised btn-pd',
            icon: null,
            click: 'Operation();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "deviceManagement.deviceRecover"
        order: 0
        stateRef: "deviceManagement.deviceRecover"
        title: "Device Recovery",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'start to recover',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'startRecover();'
        }, {
            name: 'physical delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'physicalDele();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "deviceManagement.objectsList"
        order: 0
        stateRef: "deviceManagement.objectsList"
        title: "ObjectsList",
        button: [{
            name: null,
            class: 'btn btn-sm btn-success btn-raised',
            icon: 'fa fa-search',
            click: 'search();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "deviceManagement.deviceStatus"
        order: 0
        stateRef: "deviceManagement.deviceStatus"
        title: "Device Status",
        button: [{
            name: null,
            class: 'btn btn-sm btn-success btn-raised',
            icon: 'fa fa-search',
            click: 'search();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "deviceManagement.deviceType"
        order: 0
        stateRef: "deviceManagement.deviceType"
        title: "Device Type",
        button: [{
            name: null,
            class: 'btn btn-sm btn-success btn-raised',
            icon: 'fa fa-search',
            click: 'search();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "deviceManagement.objectsListValue"
        order: 2
        stateRef: "deviceManagement.objectsListValue"
        title: "ObjectsListValue",
        button: [{
            name: null,
            class: 'btn btn-sm btn-success btn-raised',
            icon: 'fa fa-search',
            click: 'search();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'Add',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }]
    }],
    title: "Device Management"
},
{
    icon: "fa fa-arrow-circle-up"
    level: 0
    name: "upgradeManagement"
    order: 100
    stateRef: "upgradeManagement"
    subMenu: [{
        icon: undefined
        level: 1
        name: "upgradeManagement.batchUpgrade"
        order: 0
        stateRef: "upgradeManagement.batchUpgrade"
        title: "BatchUpgrade",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset  btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'delete();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toViewItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "upgradeManagement.upGradeFiles"
        order: 0
        stateRef: "upgradeManagement.upGradeFiles"
        title: "UpGradeFiles",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset  btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toViewItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "upgradeManagement.ftpConfig"
        order: 0
        stateRef: "upgradeManagement.ftpConfig"
        title: "FtpConfig",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset  btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toViewItem();'
        }]
    }]
    title: "Upgrade Management"
},
{
    icon: "fa fa-refresh"
    level: 0
    name: "PollingManagement"
    order: 100
    stateRef: "PollingManagement"
    subMenu: [{
        icon: undefined
        level: 1
        name: "PollingManagement.PollingTask"
        order: 0
        stateRef: "PollingManagement.PollingTask"
        title: "PollingTask",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'delete();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toViewItem();'
        }, {
            name: 'Enable',
            class: 'btn btn-start btn-raised btn-pd',
            icon: null,
            click: 'startPoll();'
        }, {
            name: 'Disable',
            class: 'btn btn-start btn-raised btn-pd',
            icon: null,
            click: 'endPoll();'
        }]
    }]
    title: "Polling Management"
},
{

    icon: "fa fa-bell"
    level: 0
    name: "AlarmManagement"
    order: 100
    stateRef: "AlarmManagement"
    subMenu: [{
            icon: undefined
            level: 1
            name: "AlarmManagement.currentAlarm"
            order: 0
            stateRef: "AlarmManagement.currentAlarm"
            title: "CurrentAlarm",
            button: [{
                name: 'Search',
                class: 'btn btn-green btn-sm btn-pd',
                icon: 'fa fa-search',
                click: 'search();'
            }, {
                name: 'Reset',
                class: 'btn btn-reset btn-sm btn-pd',
                icon: 'fa fa-rotate-right',
                click: 'reset();'
            }, {
                name: 'Export',
                class: 'btn btn-primary btn-with-icon btn-pd',
                icon: 'ion-android-download',
                click: 'exportList();'
            }],
            button_do: [{
                name: 'Acknowledge',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'Acknowledge();'
            }, {
                name: 'ReactiveAlarm',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'reactiveAlarm();'
            }, {
                name: 'ClearAlarm',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'clearAlarm();'
            }]
        }, {
            icon: undefined
            level: 1
            name: "AlarmManagement.historyAlarm"
            order: 0
            stateRef: "AlarmManagement.historyAlarm"
            title: "HistoryAlarm",
            button: [{
                name: 'Search',
                class: 'btn btn-green btn-sm btn-pd',
                icon: 'fa fa-search',
                click: 'search();'
            }, {
                name: 'Reset',
                class: 'btn btn-reset btn-sm btn-pd',
                icon: 'fa fa-rotate-right',
                click: 'reset();'
            }, {
                name: 'Export',
                class: 'btn btn-primary btn-with-icon btn-pd',
                icon: 'ion-android-download',
                click: 'exportList();'
            }],
            button_do: [{
                name: 'Acknowledge',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'Acknowledge();'
            }, {
                name: 'ReactiveAlarm',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'reactiveAlarm();'
            }, {
                name: 'ClearAlarm',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'clearAlarm();'
            }]
        },
        {
            icon: undefined
            level: 1
            name: "AlarmManagement.maskAlarm"
            order: 0
            stateRef: "AlarmManagement.maskAlarm"
            title: "MaskAlarm",
            button: [{
                name: 'Search',
                class: 'btn btn-green btn-sm btn-pd',
                icon: 'fa fa-search',
                click: 'search();'
            }, {
                name: 'Reset',
                class: 'btn btn-reset btn-sm btn-pd',
                icon: 'fa fa-rotate-right',
                click: 'reset();'
            }, {
                name: 'Export',
                class: 'btn btn-primary btn-with-icon btn-pd',
                icon: 'ion-android-download',
                click: 'exportList();'
            }],
            button_do: [{
                name: 'Acknowledge',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'Acknowledge();'
            }, {
                name: 'ReactiveAlarm',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'reactiveAlarm();'
            }, {
                name: 'ClearAlarm',
                class: 'btn btn-info btn-sm btn-pd',
                icon: null,
                click: 'clearAlarm();'
            }]
        }
    ]
    title: "Alarm Management"
},
{
    icon: "fa fa-wrench"
    level: 0
    name: "AlarmConfiguration"
    order: 100
    stateRef: "AlarmConfiguration"
    subMenu: [{
        icon: undefined
        level: 1
        name: "AlarmConfiguration.AlarmConfig"
        order: 0
        stateRef: "AlarmConfiguration.AlarmConfig"
        title: "Alarm Config",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toViewItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "AlarmConfiguration.AlarmKind"
        order: 0
        stateRef: "AlarmConfiguration.AlarmKind"
        title: "AlarmKind",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModify();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toShowItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "AlarmConfiguration.AlarmLevel"
        order: 0
        stateRef: "AlarmConfiguration.AlarmLevel"
        title: "AlarmLevel",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModifyItem();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'toViewItem();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "AlarmConfiguration.AlarmMask"
        order: 0
        stateRef: "AlarmConfiguration.AlarmMask"
        title: "AlarmMask",
        button_do: [{
            name: 'Save',
            class: 'btn btn-sm btn-green btn-pd',
            icon: 'fa fa-check',
            click: 'save();'
        }, {
            name: 'refresh',
            class: 'btn btn-sm btn-info btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'refresh();'
        }, {
            name: 'ExpanAll',
            class: 'btn btn-sm btn-primary btn-pd',
            icon: 'fa fa-folder-open',
            click: 'expanAll();'
        }, {
            name: 'CollapseAll',
            class: 'btn btn-sm btn-primary btn-pd',
            icon: 'fa fa-folder',
            click: 'collapseAll();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "AlarmConfiguration.generalSettings"
        order: 0
        stateRef: "AlarmConfiguration.generalSettings"
        title: "generalSettings",
        button_do: [{
            name: 'Save',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-check',
            click: 'save();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "AlarmConfiguration.AlarmForward"
        order: 0
        stateRef: "AlarmConfiguration.AlarmForward"
        title: "Alarm Forward",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }],
        button_do: [{
            name: 'Add',
            class: 'btn btn-info btn-raised btn-pd',
            icon: null,
            click: 'toAddItem();'
        }, {
            name: 'Delete',
            class: 'btn btn-danger btn-raised btn-pd',
            icon: null,
            click: 'deleteItem();'
        }, {
            name: 'Modify',
            class: 'btn btn-warning btn-raised btn-pd',
            icon: null,
            click: 'toModify();'
        }, {
            name: 'View',
            class: 'btn btn-primary btn-raised btn-pd',
            icon: null,
            click: 'tolook();'
        }]
    }]
    title: "Alarm Configuration"
},
{
    icon: "fa fa-calendar"
    level: 0
    name: "LogManagement"
    order: 100
    stateRef: "LogManagement"
    subMenu: [{
        icon: undefined
        level: 1
        name: "LogManagement.deviceLog"
        order: 0
        stateRef: "LogManagement.deviceLog"
        title: "Device Log",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "LogManagement.upgradeLog"
        order: 0
        stateRef: "LogManagement.upgradeLog"
        title: "Upgrade Log",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "LogManagement.serverStatus"
        order: 0
        stateRef: "LogManagement.serverStatus"
        title: "ServerStatus",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "LogManagement.heartbeatLog"
        order: 0
        stateRef: "LogManagement.heartbeatLog"
        title: "Heartbeat Log",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "LogManagement.alarmTransferLog"
        order: 0
        stateRef: "LogManagement.alarmTransferLog"
        title: "AlarmTransfer Log",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "LogManagement.sysLog"
        order: 0
        stateRef: "LogManagement.sysLog"
        title: "Sys Log",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "LogManagement.taskLog"
        order: 5
        stateRef: "LogManagement.taskLog"
        title: "Task Log",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }]
    title: "Log Management"
},
{

    icon: "fa fa-list"
    level: 0
    name: "reportManagement"
    order: 100
    stateRef: "reportManagement"
    subMenu: [{
        icon: undefined
        level: 1
        name: "reportManagement.performanceReport"
        order: 0
        stateRef: "reportManagement.performanceReport"
        title: "PerformanceReport",
        button: [{
            name: 'Search',
            class: 'btn btn-green btn-sm btn-pd',
            icon: 'fa fa-search',
            click: 'search();'
        }, {
            name: 'Reset',
            class: 'btn btn-reset btn-sm btn-pd',
            icon: 'fa fa-rotate-right',
            click: 'reset();'
        }, {
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "reportManagement.customReport"
        order: 0
        stateRef: "reportManagement.customReport"
        title: "CustomReport",
        button: [{
            name: 'Export',
            class: 'btn btn-primary btn-with-icon btn-pd',
            icon: 'ion-android-download',
            click: 'exportList();'
        }],
        button_do: [{
            name: 'Add',
            class: 'status-button btn btn-xs btn-info',
            icon: null,
            click: 'addReport();'
        }, {
            name: 'Modify',
            class: 'status-button btn btn-xs btn-success',
            icon: null,
            click: 'modifyReport();'
        }, {
            name: 'Delete',
            class: 'status-button btn btn-xs btn-danger',
            icon: null,
            click: 'deleteReport();'
        }]
    }, {
        icon: undefined
        level: 1
        name: "reportManagement.deviceInformationReport"
        order: 0
        stateRef: "reportManagement.deviceInformationReport"
        title: "InformationReport"
    }]
    title: "Report Management",
    button: [{
        name: 'Export',
        class: 'btn btn-primary btn-with-icon btn-pd',
        icon: 'ion-android-download',
        click: 'exportList();'
    }]
}
]
}];