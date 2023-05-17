(function() {
    'use strict';

    angular.module('SunWave.pages.reportManagement.customReport', [])
        .controller('addModalCtrl', addModalCtrl);

    function addModalCtrl($scope, transmitModalItems, isAdd, customReportService, $uibModalInstance) {


        $scope.modal = {
            reportName: "",
            id: ""
        };
        $scope.isAdd = isAdd;
        $scope.view = true;
        $scope.selectedNum = 0;
        $scope.columnStrArr = [];

        // $scope.columnCheckedAll = true;
        //modify选中col
        $scope.selectCols = function(id) {
            $scope.colCheckedIds = [];
            customReportService.selectCols(id).success(function(res) {
                $scope.colCheckedIds = res.data;
                // $scope.selectedNum = $scope.colCheckedIds.length;
                // $scope.selectedNum++;
            }).error(function(err) {
                console.log(err)
            });
        };

        if ($scope.isAdd == 'add') {
            $scope.title = 'Add';

        } else if ($scope.isAdd == 'modify') {
            $scope.title = "Modify";
            $scope.transmitModalItems = transmitModalItems;
            $scope.modal.reportName = transmitModalItems.text;
            $scope.modal.id = transmitModalItems.id;
            $scope.selectCols($scope.modal.id);

        } else {
            $scope.title = "View";
            $scope.selectCols($scope.modal.id);
        };

        $scope.query = {};
        $scope.queryOther = {
            reportInfo: "param__base",
            userDefinedId: ""
        };
        $scope.queryEnable = {
            reportInfo: "alarmYN",
            userDefinedId: ""
        };
        $scope.queryStatus = {
            reportInfo: "alarm",
            userDefinedId: ""
        };
        $scope.querySamply = {
            reportInfo: "realtime",
            userDefinedId: ""
        };
        $scope.queryParams = {
            reportInfo: "radio",
            userDefinedId: ""
        };

        $scope.checkCol = function(cols, flag) {
            // $scope.colCheckedIds = [];
            // customReportService.selectCols($scope.modal.id).success(function(res) {
            //     //全部选中的id
            //     $scope.colCheckedIds = res.data;
            //     $scope.selectedNum = $scope.colCheckedIds.length;

            var checkNum = 0;
            for (let i = 0; i < cols.length; i++) {
                const col = cols[i];
                for (let j = 0; j < $scope.colCheckedIds.length; j++) {
                    const element = $scope.colCheckedIds[j];
                    if (col.columnId == element) {
                        // $scope.columnStrArr.push(col.columnId);
                        col.columnChecked = true;
                        // $scope.checkOne();
                        // $scope.selectedNum++;
                        checkNum++;
                    }
                };

            };
            // $scope.checkOneFun(flag);
            switch (flag) {
                case '':
                    var firstCheck = true;
                    $scope.checkOne("Basic", firstCheck);
                    break;
                case 'param__base':
                    var firstCheck = true;
                    $scope.checkOne("Other", firstCheck);
                    break;
                case 'alarmYN':
                    var firstCheck = true;
                    $scope.checkOne("Enable", firstCheck);
                    break;
                case 'alarm':
                    var firstCheck = true;
                    $scope.checkOne("Status", firstCheck);
                    break;
                case 'realtime':
                    var firstCheck = true;
                    $scope.checkOne("Samply", firstCheck);
                    break;
                case 'radio':
                    var firstCheck = true;
                    $scope.checkOne("Params", firstCheck);
                    break;
            };

            if (checkNum == cols.length) {

                switch (flag) {
                    case '':
                        $scope.checkOne("Basic");
                        if (checkNum == cols.length)
                            $scope.columnCheckedAll = true;
                        break;
                    case 'param__base':
                        $scope.checkOne("Other");
                        if (checkNum == cols.length)
                            $scope.columnCheckedAllOther = true;
                        break;
                    case 'alarmYN':
                        $scope.checkOne("Enable");
                        if (checkNum == cols.length)
                            $scope.columnCheckedAllEnable = true;
                        break;
                    case 'alarm':
                        $scope.checkOne("Status");
                        if (checkNum == cols.length)
                            $scope.columnCheckedAllStatus = true;
                        break;
                    case 'realtime':
                        $scope.checkOne("Samply");
                        if (checkNum == cols.length)
                            $scope.columnCheckedAllSamply = true;
                        break;
                    case 'radio':
                        $scope.checkOne("Params");
                        if (checkNum == cols.length)
                            $scope.columnCheckedAllParams = true;
                        break;
                }
            }

            //     }).error(function(err) {
            //     console.log(err)
            // });

        };

        //勾选判断
        $scope.IsCheck = function() {
            if (condition) {

            }
        };


        $scope.searchCol = function() {
            customReportService.searchCol($scope.query).success(function(res) {
                $scope.checks = res.data;
                if ($scope.isAdd == 'modify') {
                    $scope.checkCol($scope.checks, '');
                }
            });
            customReportService.searchCol($scope.queryOther).success(function(res) {
                $scope.checksOther = res.data;
                if ($scope.isAdd == 'modify') {
                    $scope.checkCol($scope.checksOther, 'param__base');
                }
            });
            customReportService.searchCol($scope.queryEnable).success(function(res) {
                $scope.checksEnable = res.data;
                if ($scope.isAdd == 'modify') {
                    $scope.checkCol($scope.checksEnable, 'alarmYN');
                }
            });
            customReportService.searchCol($scope.queryStatus).success(function(res) {
                $scope.checksStatus = res.data;
                if ($scope.isAdd == 'modify') {
                    $scope.checkCol($scope.checksStatus, 'alarm');
                }
            });
            customReportService.searchCol($scope.querySamply).success(function(res) {
                $scope.checksSamply = res.data;
                if ($scope.isAdd == 'modify') {
                    $scope.checkCol($scope.checksSamply, 'realtime');
                }
            });
            customReportService.searchCol($scope.queryParams).success(function(res) {
                $scope.checksParams = res.data;
                if ($scope.isAdd == 'modify') {
                    $scope.checkCol($scope.checksParams, 'radio');
                }
            });

        };
        $scope.searchCol();

        $scope.checked = []; //选中的ID
        $scope.checkedItems = []; //选中的对象数组
        $scope.checkedOther = []; //选中的ID
        $scope.checkedItemsOther = []; //选中的对象数组
        $scope.checkedEnable = []; //选中的ID
        $scope.checkedItemsEnable = []; //选中的对象数组
        $scope.checkedSamply = []; //选中的ID
        $scope.checkedItemsSamply = []; //选中的对象数组
        $scope.checkedStatus = []; //选中的ID
        $scope.checkedItemsStatus = []; //选中的对象数组
        $scope.checkedParams = []; //选中的ID
        $scope.checkedItemsParams = []; //选中的对象数组


        $scope.checkAll = function(params) {
            switch (params) {
                case 'Basic':
                    if ($scope.columnCheckedAll) {
                        var index = $scope.checked.length;

                        if (index == 0) {
                            $scope.checked = [];
                            $scope.checkedItems = [];
                            angular.forEach($scope.checks, function(i) {
                                i.columnChecked = true;
                                $scope.checked.push(i.columnId);
                                $scope.checkedItems.push(i);
                                $scope.selectedNum++;
                            });
                        } else if (index != 0) {
                            angular.forEach($scope.checks, function(i) {
                                if (i.columnChecked == true) {
                                    console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checked.push(i.columnId);
                                    $scope.checkedItems.push(i);
                                    $scope.selectedNum++;
                                }

                            });
                        };

                    } else {
                        $scope.checked = [];
                        $scope.checkedItems = [];
                        angular.forEach($scope.checks, function(i) {
                            i.columnChecked = false;
                            $scope.selectedNum--;
                        });
                    }
                    console.log(`base全选取消${$scope.checkedItems}`);
                    break;

                case 'Other':
                    if ($scope.columnCheckedAllOther) {

                        var index2 = $scope.checkedOther.length;

                        if (index2 == 0) {
                            $scope.checkedOther = [];
                            $scope.checkedItemsOther = [];
                            angular.forEach($scope.checksOther, function(i) {
                                i.columnChecked = true;
                                $scope.checkedOther.push(i.columnId);
                                $scope.checkedItemsOther.push(i);
                                $scope.selectedNum++;
                            });
                        } else if (index2 != 0) {
                            angular.forEach($scope.checksOther, function(i) {
                                if (i.columnChecked == true) {
                                    console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedOther.push(i.columnId);
                                    $scope.checkedItemsOther.push(i);
                                    $scope.selectedNum++;
                                }

                            });
                        };

                    } else {
                        $scope.checkedOther = [];
                        $scope.checkedItemsOther = [];
                        angular.forEach($scope.checksOther, function(i) {
                            i.columnChecked = false;
                            $scope.selectedNum--;
                        });

                    }
                    console.log($scope.checkedItemsOther);
                    break;

                case 'Enable':
                    if ($scope.columnCheckedAllEnable) {
                        var index3 = $scope.checkedEnable.length;
                        if (index3 == 0) {
                            $scope.checkedEnable = [];
                            $scope.checkedItemsEnable = [];
                            angular.forEach($scope.checksEnable, function(i) {
                                i.columnChecked = true;
                                $scope.checkedEnable.push(i.columnId);
                                $scope.checkedItemsEnable.push(i);
                                $scope.selectedNum++;
                            });
                        } else if (index3 != 0) {
                            angular.forEach($scope.checksEnable, function(i) {
                                if (i.columnChecked == true) {
                                    console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedEnable.push(i.columnId);
                                    $scope.checkedItemsEnable.push(i);
                                    $scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        $scope.checkedEnable = [];
                        $scope.checkedItemsEnable = [];
                        angular.forEach($scope.checksEnable, function(i) {
                            i.columnChecked = false;
                            $scope.selectedNum--;
                        });
                    }
                    console.log($scope.checkedItemsEnable);
                    break;

                case 'Status':
                    if ($scope.columnCheckedAllStatus) {

                        var index4 = $scope.checkedStatus.length;

                        if (index4 == 0) {
                            $scope.checkedStatus = [];
                            $scope.checkedItemsStatus = [];
                            angular.forEach($scope.checksStatus, function(i) {
                                i.columnChecked = true;
                                $scope.checkedStatus.push(i.columnId);
                                $scope.checkedItemsStatus.push(i);
                                $scope.selectedNum++;
                            });
                        } else if (index4 != 0) {
                            angular.forEach($scope.checksStatus, function(i) {
                                if (i.columnChecked == true) {
                                    console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedStatus.push(i.columnId);
                                    $scope.checkedItemsStatus.push(i);
                                    $scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        angular.forEach($scope.checksStatus, function(i) {
                            i.columnChecked = false;
                            $scope.checkedStatus = [];
                            $scope.checkedItemsStatus = [];
                            $scope.selectedNum--;
                        });
                    }
                    console.log($scope.checkedItemsStatus);
                    break;

                case 'Samply':
                    if ($scope.columnCheckedAllSamply) {
                        var index5 = $scope.checkedSamply.length;

                        if (index5 == 0) {
                            $scope.checkedSamply = [];
                            $scope.checkedItemsSamply = [];
                            angular.forEach($scope.checksSamply, function(i) {
                                i.columnChecked = true;
                                $scope.checkedSamply.push(i.columnId);
                                $scope.checkedItemsSamply.push(i);
                                $scope.selectedNum++;
                            });
                        } else if (index5 != 0) {
                            angular.forEach($scope.checksSamply, function(i) {
                                if (i.columnChecked == true) {
                                    console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedSamply.push(i.columnId);
                                    $scope.checkedItemsSamply.push(i);
                                    $scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        angular.forEach($scope.checksSamply, function(i) {
                            i.columnChecked = false;
                            $scope.checkedSamply = [];
                            $scope.checkedItemsSamply = [];
                            $scope.selectedNum--;
                        });
                    }
                    console.log($scope.checkedItemsSamply);
                    break;

                case 'Params':
                    if ($scope.columnCheckedAllParams) {
                        var index6 = $scope.checkedParams.length;
                        if (index6 == 0) {
                            $scope.checkedParams = [];
                            $scope.checkedItemsParams = [];
                            angular.forEach($scope.checksParams, function(i) {
                                i.columnChecked = true;
                                $scope.checkedParams.push(i.columnId);
                                $scope.checkedItemsParams.push(i);
                                $scope.selectedNum++;
                            });
                        } else if (index6 != 0) {
                            angular.forEach($scope.checksParams, function(i) {
                                if (i.columnChecked == true) {
                                    console.log(i);
                                } else {
                                    i.columnChecked = true;
                                    $scope.checkedParams.push(i.columnId);
                                    $scope.checkedItemsParams.push(i);
                                    $scope.selectedNum++;
                                }

                            });
                        };
                    } else {
                        angular.forEach($scope.checksParams, function(i) {
                            i.columnChecked = false;
                            $scope.checkedParams = [];
                            $scope.checkedItemsParams = [];
                            $scope.selectedNum--;
                        });
                    }
                    console.log($scope.checkedItemsParams);
                    break;


                default:
                    break;
            }

        };
        $scope.checkOne = function(params, firstCheck) {
            switch (params) {
                case 'Basic':
                    if (firstCheck == true) {
                        angular.forEach($scope.checks, function(i) {
                            if (i.columnChecked == true) {
                                $scope.checked.push(i.columnId);
                                $scope.checkedItems.push(i);
                                $scope.selectedNum++;
                                // firstCheck = false;
                            };
                        });
                    } else {
                        angular.forEach($scope.checks, function(i) {
                            var index = $scope.checked.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.selectedNum++;
                                $scope.checked.push(i.columnId);
                                $scope.checkedItems.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checked.splice(index, 1);
                                $scope.checkedItems.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checks.length == $scope.checked.length) {
                        $scope.columnCheckedAll = true;
                    } else {
                        $scope.columnCheckedAll = false;
                    };
                    console.log($scope.checkedItems);
                    break;

                case 'Other':
                    if (firstCheck == true) {
                        angular.forEach($scope.checksOther, function(i) {
                            if (i.columnChecked == true) {
                                $scope.checkedOther.push(i.columnId);
                                $scope.checkedItemsOther.push(i);
                                $scope.selectedNum++;
                                // firstCheck = false;
                            };
                        });
                    } else {
                        angular.forEach($scope.checksOther, function(i) {
                            var index = $scope.checkedOther.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.selectedNum++;
                                $scope.checkedOther.push(i.columnId);
                                $scope.checkedItemsOther.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedOther.splice(index, 1);
                                $scope.checkedItemsOther.splice(index, 1);
                            } else {
                                return
                            };
                        })

                    };
                    if ($scope.checksOther.length == $scope.checkedOther.length) {
                        $scope.columnCheckedAllOther = true;
                    } else {
                        $scope.columnCheckedAllOther = false;
                    };
                    console.log($scope.checkedItemsOther);
                    break;

                case 'Enable':
                    if (firstCheck == true) {
                        angular.forEach($scope.checksEnable, function(i) {
                            if (i.columnChecked == true) {
                                $scope.checkedEnable.push(i.columnId);
                                $scope.checkedItemsEnable.push(i);
                                // firstCheck = false;
                                $scope.selectedNum++;
                            };
                        });
                        // firstCheck = false;
                    } else {
                        angular.forEach($scope.checksEnable, function(i) {
                            var index = $scope.checkedEnable.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.selectedNum++;
                                $scope.checkedEnable.push(i.columnId);
                                $scope.checkedItemsEnable.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedEnable.splice(index, 1);
                                $scope.checkedItemsEnable.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checksEnable.length == $scope.checkedEnable.length) {
                        $scope.columnCheckedAllEnable = true;
                    } else {
                        $scope.columnCheckedAllEnable = false;
                    };
                    console.log($scope.checkedItemsEnable);
                    break;

                case 'Status':
                    if (firstCheck == true) {
                        angular.forEach($scope.checksStatus, function(i) {
                            if (i.columnChecked == true) {
                                $scope.checkedStatus.push(i.columnId);
                                $scope.checkedItemsStatus.push(i);
                                $scope.selectedNum++;
                                // firstCheck = false;
                            };
                        });
                    } else {
                        angular.forEach($scope.checksStatus, function(i) {
                            var index = $scope.checkedStatus.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.selectedNum++;
                                $scope.checkedStatus.push(i.columnId);
                                $scope.checkedItemsStatus.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedStatus.splice(index, 1);
                                $scope.checkedItemsStatus.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checksStatus.length == $scope.checkedStatus.length) {
                        $scope.columnCheckedAllStatus = true;
                    } else {
                        $scope.columnCheckedAllStatus = false;
                    };
                    console.log($scope.checkedItemsStatus);
                    break;

                case 'Samply':
                    if (firstCheck == true) {
                        angular.forEach($scope.checksSamply, function(i) {
                            if (i.columnChecked == true) {
                                $scope.checkedSamply.push(i.columnId);
                                $scope.checkedItemsSamply.push(i);
                                $scope.selectedNum++;
                                // firstCheck = false;
                            };
                        });
                    } else {
                        angular.forEach($scope.checksSamply, function(i) {
                            var index = $scope.checkedSamply.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.selectedNum++;
                                $scope.checkedSamply.push(i.columnId);
                                $scope.checkedItemsSamply.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedSamply.splice(index, 1);
                                $scope.checkedItemsSamply.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checksSamply.length == $scope.checkedSamply.length) {
                        $scope.columnCheckedAllSamply = true;
                    } else {
                        $scope.columnCheckedAllSamply = false;
                    };
                    console.log($scope.checkedItemsSamply);
                    break;

                case 'Params':
                    if (firstCheck == true) {
                        angular.forEach($scope.checksParams, function(i) {
                            if (i.columnChecked == true) {
                                $scope.checkedParams.push(i.columnId);
                                $scope.checkedItemsParams.push(i);
                                $scope.selectedNum++;
                                // firstCheck = false;
                            };
                        });
                    } else {
                        angular.forEach($scope.checksParams, function(i) {
                            var index = $scope.checkedParams.indexOf(i.columnId);
                            if (i.columnChecked && index == -1) {
                                $scope.selectedNum++;
                                $scope.checkedParams.push(i.columnId);
                                $scope.checkedItemsParams.push(i);
                            } else if (!i.columnChecked && index !== -1) {
                                $scope.selectedNum--;
                                $scope.checkedParams.splice(index, 1);
                                $scope.checkedItemsParams.splice(index, 1);
                            } else {
                                return
                            };
                        })
                    };

                    if ($scope.checksParams.length == $scope.checkedParams.length) {
                        $scope.columnCheckedAllParams = true;
                    } else {
                        $scope.columnCheckedAllParams = false;
                    };
                    console.log($scope.checkedItemsParams);
                    break;

                default:
                    break;
            }


        };
        $scope.getcolumArr = function(checkedItems) {

            for (let i = 0; i < checkedItems.length; i++) {
                $scope.columnStrArr.push(checkedItems[i].columnId);
            };
        };


        $scope.save = function() {

            var newItems = {};
            $scope.columnStrArr = [];
            // var columnStr = "";
            $scope.getcolumArr($scope.checkedItems);
            $scope.getcolumArr($scope.checkedItemsOther);
            $scope.getcolumArr($scope.checkedItemsEnable);
            $scope.getcolumArr($scope.checkedItemsStatus);
            $scope.getcolumArr($scope.checkedItemsSamply);
            $scope.getcolumArr($scope.checkedItemsParams);

            newItems.paramsStr = $scope.columnStrArr.toString();
            newItems.reportName = $scope.modal.reportName;
            if (newItems.paramsStr == '') {
                alert('Select at least one parameter');
                return
            } else {}

            // newItems.columnChecked = true;
            if ($scope.isAdd == 'add') {

                customReportService.addReportList(newItems)
                    .success(function(response) {
                        if (response.data == true) {
                            alert("Success");
                            $scope.close();
                        } else {
                            alert("failed" + response.data.msg)
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });
            } else if ($scope.isAdd == 'modify') {

                newItems.reportId = $scope.modal.id;
                customReportService.editReportList(newItems)
                    .success(function(response) {
                        if (response.data == true) {
                            alert("Success");
                            $scope.close();
                        } else {
                            alert("failed" + response.data.msg)
                        }
                    })
                    .error(function(err) {
                        console.info(err);
                    });

            } else {

            }


        };
        $scope.close = function(newItems) {
            $uibModalInstance.close(newItems);
        };

    }
})();