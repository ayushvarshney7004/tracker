"use client";
import { Button, Flex, Link } from "@radix-ui/themes";

import React, { useState } from "react";
import Spinner from "../../component/spinner";
import IssueFiter from "./IssueFilter";
import { useRouter } from "next/navigation";

const IssueActions = () => {
  const [isopen, setisopen] = useState(false);
  const router = useRouter();

  return (
    <Flex className="space-x-4" justify="center">
      <IssueFiter />
      <Button
        disabled={isopen}
        onClick={() => {
          setisopen(!isopen), router.push("/issues/new");
        }}
      >
        New issue {isopen && <Spinner />}
      </Button>
    </Flex>
  );
};

export default IssueActions;
