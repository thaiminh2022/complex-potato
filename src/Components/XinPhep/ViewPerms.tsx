import React, { useMemo } from "react";


function ViewPerms(props: ViewPermsProps) {

    return <>
        <h1>PERMISSIONS</h1>
    </>
}

interface ViewPermsProps {
    papers: AskPermissionForm[]
}
export default ViewPerms;