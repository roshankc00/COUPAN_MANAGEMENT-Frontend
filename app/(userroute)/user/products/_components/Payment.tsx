"uce client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Disc2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { postPayment } from "@/common/api/payment/payment.api";
import toast from "react-hot-toast";

const Payment: React.FC<{ item: any }> = ({ item }) => {
  const [qrcode, setqrcode] = useState("");
  const formSchemaPayment = z.object({
    remark: z.string().min(5, {
      message: " must be of 5 charecter ",
    }),
  });
  const formPayment = useForm<z.infer<typeof formSchemaPayment>>({
    resolver: zodResolver(formSchemaPayment),
    defaultValues: {
      remark: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: postPayment,
    onSuccess(data) {
      setqrcode(data?.qrCodeUrl);
    },
  });
  const onSubmitPayment = (values: z.infer<typeof formSchemaPayment>) => {
    if (!item?.price) {
      return toast.error("Please select the product first");
    } else {
      mutateAsync({
        amount: item?.price as number,
        remark: values.remark,
      });
    }
  };
  return (
    <div className="flex justify-between items-center mt-10">
      <div>
        <div className="flex gap-2 items-center">
          <Disc2 className="h-5 w-5" color="red" />
          <img
            src="https://cdn.fonepay.com/fonepay-pub/fonepay-brand/fonepay_logo.png"
            className="h-8 w-20"
          />
        </div>
        <Form {...formPayment}>
          <form onSubmit={formPayment.handleSubmit(onSubmitPayment)}>
            <FormField
              name="remark"
              control={formPayment.control}
              render={({ field }) => (
                <>
                  <FormItem className="mb-3 mt-3">
                    <FormLabel>
                      Provide the valid remark so that we can recognize You
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="border border-[#d3d3d1]"
                        placeholder="Enter the Remark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <div className="w-full justify-between flex gap-3">
              <Button type="submit" className="w-full mt-4">
                Generate
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-black w-full mt-4"
                onClick={() => setqrcode("")}
              >
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div>
        {qrcode && (
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOQAAADkCAYAAACIV4iNAAAAAklEQVR4AewaftIAAAxZSURBVO3BQY4cybIgQdVA3f/KOtyNrRwIZBbp/b6J2B+sta7wsNa6xsNa6xoPa61rPKy1rvGw1rrGw1rrGg9rrWs8rLWu8bDWusbDWusaD2utazysta7xsNa6xsNa6xoPa61r/PAhlb+p4hMqb1RMKlPFJ1ROKk5UflPFicpUMalMFd+kMlVMKn9TxSce1lrXeFhrXeNhrXWNH76s4ptU3lCZKqaKSWWqmFSmiknlJhVvqEwVk8obKlPFpDJVTCq/qeKbVL7pYa11jYe11jUe1lrX+OGXqbxR8YbKN6lMFZPKVDGpvFExqXxC5Y2Kk4pJZaqYVN5QOamYVL5J5Y2K3/Sw1rrGw1rrGg9rrWv88D+mYlI5qZhUJpWp4o2Kb1KZKk5UTlSmikllqphUPlHxiYr/JQ9rrWs8rLWu8bDWusYP/2NU3lCZKiaVSWWqOFF5o2JSOVH5RMVJxUnFpDKpTBWTyknFVPG/7GGtdY2HtdY1HtZa1/jhl1X8TRWTyknFpDJVTCqTyhsVk8obFW+ofEJlqjipmFQ+oTJVfFPFTR7WWtd4WGtd42GtdY0fvkzlZhWTylQxqUwVk8pUMan8JpWp4qRiUpkq3lCZKj5RMamcqEwVJyo3e1hrXeNhrXWNh7XWNX74UMX6/1SmiknlmyreUJkqPlExqXxCZao4qTip+C95WGtd42GtdY2HtdY17A8+oDJVTCrfVPFNKp+o+ITK31TxCZU3KiaVk4pJ5Y2KSeWbKn7Tw1rrGg9rrWs8rLWuYX/wRSonFZPKVHGi8kbFpDJV3ExlqjhRmSomlTcq3lCZKk5UpooTlaniDZWpYlKZKv6mh7XWNR7WWtd4WGtd44cPqbyhcqLyRsWkMqm8oTJVTCpTxYnKVDGpTBUnKlPFJyomlUllqjipmFSmiqliUjmpmFTeqPiEyknFJx7WWtd4WGtd42GtdQ37g79IZaqYVKaKT6icVEwq31TxhspJxTepTBWfUHmj4g2Vk4pJZaqYVKaKSWWq+E0Pa61rPKy1rvGw1rrGDx9SmSpOKk4qJpV/qWJSmSpOVE4qTipOVKaKE5VvUnmjYlKZKiaVb1J5o+JvelhrXeNhrXWNh7XWNX74MpWpYlI5qZgqTlSmihOVSWWqmFSmikllqpgqvkllqjhROan4popJ5Q2VqeITFScqk8pJxaQyVXziYa11jYe11jUe1lrX+OFyKlPFVPFGxaQyqUwVk8pUMam8UTFVnFRMKlPFScWkMlWcqEwVk8pUcVJxonJSMamcVEwVJyp/08Na6xoPa61rPKy1rvHDhypOVKaKSWVSmSomlaliUjmpmCo+oXJS8YbKVDGpfFPFico3qZxUfKJiUplU3qj4mx7WWtd4WGtd42GtdQ37g79IZao4UZkqJpWTiknlpGJSmSomlaniRGWqeENlqjhROamYVE4qvknlpGJSOamYVKaKSeWNikllqvjEw1rrGg9rrWs8rLWuYX/wAZWp4g2VqeITKm9UTCqfqJhUpopJ5aTiX1I5qZhUpopJ5ZsqvkllqphUpopvelhrXeNhrXWNh7XWNewPvkhlqphUTiomlW+q+ITKVPGGylRxovJGxaRyUjGpnFR8k8pU8YbKVDGpTBVvqEwVv+lhrXWNh7XWNR7WWtewP/gilU9UvKEyVUwqJxUnKn9TxW9SmSomlZOKN1TeqDhR+aaKSWWqmFSmim96WGtd42GtdY2HtdY1fvhlFZPKVDGpvFExqdykYlKZKiaVk4oTlanijYoTlaliUpkqJpWpYlJ5o+JEZap4Q2WqmFSmik88rLWu8bDWusbDWusaP/wylaliUpkqTlQmlaniROWbKj6h8gmVqeINlaliUpkqJpUTlaliUpkqTlROVKaKSWWqmCpOVH7Tw1rrGg9rrWs8rLWuYX/wAZWTihOV31RxojJVTConFScqU8WkMlVMKt9UMam8UTGpTBWfUPkvqfimh7XWNR7WWtd4WGtdw/7gi1ROKiaVqeINlaniRGWqmFSmiknlpGJSmSpOVE4q3lA5qZhUpopJZaqYVN6o+ITKVPGGyknF3/Sw1rrGw1rrGg9rrWv88MsqPqEyVbyhcqJyovKGylQxqUwVn1CZKk4qJpWpYlL5TSpTxaTyCZWp4qTiROWk4hMPa61rPKy1rvGw1rqG/cEvUpkqJpWp4g2VT1ScqEwVJyqfqJhUpoo3VE4qJpWp4g2Vk4pJ5aTiRGWqeEPlpOJvelhrXeNhrXWNh7XWNewP/iGVb6qYVKaKN1ROKiaVqeJE5V+qmFROKiaVk4oTlaniROVfqphUpopPPKy1rvGw1rrGw1rrGj98SOWkYlJ5o+ITFZPKVPFGxTdVTCpTxYnKScWkclIxqUwqn1CZKiaVqeI3VdzkYa11jYe11jUe1lrXsD/4IpWp4hMqn6g4UTmp+JdU3qh4Q2WqmFSmiknljYpvUpkqTlTeqJhUpopvelhrXeNhrXWNh7XWNX74kMpUcaLyRsWk8k0V36QyVUwqJxUnFZPKpDJVfJPKScWk8gmVk4pJ5aRiUjlRmSomlaniEw9rrWs8rLWu8bDWusYPH6p4o2JSmSomlaliUpkqTlSmiknlpOINlaliUjmpmFROKk5U3qiYVKaKk4oTlZOKSeWk4kRlqjhR+Zse1lrXeFhrXeNhrXWNHy5XcVIxqUwVb1RMKpPKVDFVnKi8oTJVTCqTylRxUjGpTBVTxRsqU8VJxaQyVUwqU8WkMlVMKm+o/KaHtdY1HtZa13hYa13D/uCLVKaKSWWqmFTeqDhRmSomlTcq3lA5qThRmSomlaniDZWp4kTlmyomlTcqfpPKGxWfeFhrXeNhrXWNh7XWNewPPqAyVUwqU8WkclJxonJSMamcVEwq31QxqUwVJypTxRsqb1ScqEwVk8pU8QmVk4oTlZOKf+lhrXWNh7XWNR7WWtewP/iAylRxovKJijdUTipOVKaKE5WTihOVNyomlZOKSWWqmFQ+UTGpTBXfpDJVvKEyVUwqJxWfeFhrXeNhrXWNh7XWNX64XMUbKlPFJyomlZOKE5Wp4qTiRGWqeKNiUpkqTlSmipOKE5Wp4ptUPlExqXzTw1rrGg9rrWs8rLWu8cOXqZxUTConKlPFScWk8i+pTBUnFZPKVDFVTConFZPKVHGi8obKScWJylQxqZyo/Jc8rLWu8bDWusbDWusaP3yo4hMVk8pUMamcVEwVJyonFW+oTBWTyidUpoqp4kRlqphUTipOVKaKNyomlTcqJpX/koe11jUe1lrXeFhrXcP+4ItUpoo3VE4qfpPKJyo+oXJScaJyUvGGylQxqUwVk8pUMan8TRWTyknFpDJVfNPDWusaD2utazysta7xwy9TOamYKt5QmSpOVN6oeEPlpOKNihOVqeJvqphUpoo3KiaVNyreqHijYlKZKj7xsNa6xsNa6xoPa61r2B98QOWNijdUTipOVE4qTlROKr5J5TdVTCpTxYnKb6o4UfmbKiaVqeKbHtZa13hYa13jYa11DfuD/zCVqeJEZar4hMpU8YbKGxVvqHyi4kRlqphUpopJZaqYVN6oeEPlpGJSOan4xMNa6xoPa61rPKy1rvHDh1T+poqp4kRlqnhDZap4Q2Wq+CaVqeKk4l9SeaNiUnlDZaq42cNa6xoPa61rPKy1rvHDl1V8k8qJylRxojJVvKEyVZxUTCpTxYnKScVvUvlNFZPKVPGJik+oTBW/6WGtdY2HtdY1HtZa1/jhl6m8UfEJlaniROU3qbyhcqLyCZWp4o2KSWVSmSpOVKaKSeUNlW+qmFROKj7xsNa6xsNa6xoPa61r/PB/jMpJxaRyonJS8U0Vk8obFScqU8WkMlWcqJxUTCqfqDhReUNlqphUvulhrXWNh7XWNR7WWtf44f+4ipOKSeUNlZOKqeJEZao4UTlReaPiRGWqmFQmlaniROUTFW+o/E0Pa61rPKy1rvGw1rrGD7+s4jdVfEJlqvhNFScqn1B5o+JE5aTijYpJ5URlqjhROamYVE4qJpXf9LDWusbDWusaD2uta/zwZSp/k8pUcVIxqfymiknlpOITFScqU8WkclJxUvFNFZPKVDFVfJPKVDGpfNPDWusaD2utazysta5hf7DWusLDWusaD2utazysta7xsNa6xsNa6xoPa61rPKy1rvGw1rrGw1rrGg9rrWs8rLWu8bDWusbDWusaD2utazysta7x/wDh3OTTRtRxTgAAAABJRU5ErkJggg=="
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
