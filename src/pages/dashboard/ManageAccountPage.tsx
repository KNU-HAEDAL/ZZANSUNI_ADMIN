
import AccountTable from "@/pages/dashboard/component/AccountTable.tsx";
import AddManagerDialog from "@/pages/dashboard/component/AddManagerDialog.tsx";

export default function ManageAccountPage() {

  // const {content, totalPage, page, size, category} = useChallengeGroupPaging();

  return (
    <div className="w-full h-full">
      <div className="font-normal px-4 pb-4 text-[18px]">
        계정 관리
      </div>
      <div className="w-[300px] px-4">
        <AddManagerDialog/>
      </div>
      <AccountTable/>
      {/*<PaginationBottomButtonGroup*/}
      {/*  currentPage={page}*/}
      {/*  size={size}*/}
      {/*  totalPage={totalPage ?? 1}*/}
      {/*  condition={[]}*/}
      {/*  prefetchFn={() => {}}*/}
      {/*/>*/}
      <div className="h-4"/>
    </div>
  );
}

