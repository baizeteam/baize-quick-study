import { useState } from "react";
import { Button, Spin } from "@arco-design/web-react";
import { getProjectInfo } from "@/api/project";
import { $Notification } from "@/utils/toast.ts";
import projectInfoStore from "@/store/projectInfo";
import { observer } from "mobx-react";

function MockData() {
    const [loading, setLoading] = useState(false);
    function getMockData() {
        setLoading(true)
        getProjectInfo({}).then((res: any) => {
            setLoading(false)
            const { data, code } = res
            if (code === 200) {
                projectInfoStore.updateProjectInfo(data)
                $Notification({ content: '请求数据成功！'} )
            } else {
                $Notification({ content: '请求数据失败, 请检查问题!', type: 'error'} )
            }
        }, error => {
            setLoading(false)
            $Notification({ content: '请求数据失败, 请检查问题!', type: 'error'} )
        })
    }

    return (
        <div>
            <Spin tip='Loading...' loading={loading}>
                <Button type='primary' onClick={getMockData}>
                    点击按钮请求数据
                </Button>
                <div>
                    <div>
                        <span className="title">团队名称：</span>
                        <span>{ projectInfoStore.projectInfo.name }</span>
                    </div>
                    <div>
                        <span className="title">项目名称：</span>
                        <span>{ projectInfoStore.projectInfo.projectName }</span>
                    </div>
                    <div>
                        <span className="title">项目描述：</span>
                        <span>{ projectInfoStore.projectInfo.desc }</span>
                    </div>
                    <div>
                        <span className="title">当前数据来源：</span>
                        <span>{ projectInfoStore.projectInfo.type }</span>
                    </div>
                </div>
            </Spin>
            
        </div>
    )
}

export default observer(MockData)