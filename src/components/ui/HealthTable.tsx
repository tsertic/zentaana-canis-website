"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { HealthTest, Locale } from "@/lib/types";

type Props = {
  tests: HealthTest[];
  locale: Locale;
};

export default function HealthTable({ tests, locale }: Props) {
  const t = useTranslations("dogs");

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-800 mb-8">
        {t("health")}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-primary-200">
              <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-neutral-400 font-medium">
                {locale === "hr" ? "Test" : "Test"}
              </th>
              <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-neutral-400 font-medium">
                {locale === "hr" ? "Rezultat" : "Result"}
              </th>
              <th className="text-left py-3 px-4 text-xs uppercase tracking-wider text-neutral-400 font-medium">
                {locale === "hr" ? "Datum" : "Date"}
              </th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test, i) => (
              <motion.tr
                key={test._key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-neutral-700 font-medium">
                  {test.testName}
                </td>
                <td className="py-4 px-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-green-50 text-green-700 border border-green-200">
                    {test.result}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-neutral-400">
                  {test.date
                    ? new Date(test.date).toLocaleDateString(
                        locale === "hr" ? "hr-HR" : "en-GB",
                      )
                    : "—"}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}
