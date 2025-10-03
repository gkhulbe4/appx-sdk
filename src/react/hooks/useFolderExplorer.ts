import { useEffect, useState } from "react";
import { AppxSdk } from "../../node";

export type Item = {
  id: string;
  parent_id: string;
  Title: string;
  description: string;
  material_type: string;
  duration: string;
  video_player_url: string;
  date_and_time: string;
  videos_count: string;
  course_id: string;
  ytFlag: number;
  folder_wise_course: number;
  is_purchased?: string;
};

export type Breadcrumb = { id: string; title: string };

export function useFolderExplorer(sdk: AppxSdk, courseId: string) {
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const currentFolderId = breadcrumbs[breadcrumbs.length - 1]?.id;
  useEffect(() => {
    if (!sdk || !courseId) return;

    const init = async () => {
      setLoading(true);
      const res = await sdk.courses.getRootFolderContents(
        courseId,
        "-1",
        "false",
        "0"
      );
      if (res?.data?.length > 0) {
        const root = res.data[0];
        if (!root) return;
        if (root.is_purchased === "0") {
          window.location.href = `/courses/${root.course_id}`;
          return;
        }

        setBreadcrumbs([{ id: root.id, title: root.Title.toUpperCase() }]);
        await loadFolderContents(root.id, true);
      }
      setLoading(false);
    };

    init();
  }, [sdk, courseId]);

  async function loadFolderContents(folderId: string, reset = false) {
    if (loading || !sdk) return;

    setLoading(true);
    const res = await sdk.courses.getFolderContents(
      courseId,
      folderId,
      reset ? "0" : start.toString()
    );

    if (res?.data?.length > 0) {
      setItems((prev) => (reset ? res.data : [...prev, ...res.data]));
      setStart((prev) => (reset ? res.data.length : prev + res.data.length));
      setHasMore(res.data.length > 0);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  }

  async function openFolder(folder: Breadcrumb) {
    setStart(0);
    setHasMore(true);

    setBreadcrumbs((prev) => {
      const idx = prev.findIndex((b) => b.id === folder.id);
      if (idx !== -1) return prev.slice(0, idx + 1);
      return [...prev, folder];
    });

    await loadFolderContents(folder.id, true);
  }

  return {
    items,
    breadcrumbs,
    openFolder,
    loadFolderContents,
    hasMore,
    currentFolderId,
    loading,
  };
}
