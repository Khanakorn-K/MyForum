"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useCreatePost } from "./hooks/useCreatePost";
import { Plus, X } from "lucide-react";
import { useGlobal } from "@/hooks/globalHook";
import TiptapEditor from "@/components/ui/TiptapEditor";

export default function CreatePostIndex() {
  const {
    isLoading,
    error,
    formData,
    handleSubmit,
    handleChange,
    removeTag,
    removeCategory,
    router,
    postId,
    // New exports
    manualCategory,
    setManualCategory,
    manualTag,
    setManualTag,
    previewUrl,
    handleManualCategoryKeyDown,
    handleManualTagKeyDown,
    handleAddCategoryClick,
    handleAddTagClick,
    handleRemovePreviewImage,
    handleSelectCategory,
    handleSelectTag,
    handleFileChange,
    handleContentChange,
  } = useCreatePost();

  const { tags: availableTags, category: availableCategories } = useGlobal();

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            {postId ? "UpdatePost" : "Create New Post"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-foreground"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Enter post title"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-foreground"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground resize-none"
                placeholder="Brief summary of your post"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-foreground"
              >
                Content <span className="text-red-500">*</span>
              </label>
              <TiptapEditor
                content={formData.content}
                onChange={handleContentChange}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-foreground"
              >
                Cover Image URL
              </label>

              {/* ส่วนแสดง Preview Image */}
              {previewUrl && (
                <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden border border-border bg-muted/30 group">
                  <img
                    src={previewUrl}
                    alt="Cover Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePreviewImage}
                    className="absolute top-2 right-2 bg-destructive/80 text-white p-1 rounded-full shadow-md hover:bg-destructive transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <input
                type="file"
                id="coverImage"
                name="coverImage"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Categories
              </label>
              <div className="flex gap-2">
                <select
                  onChange={handleSelectCategory}
                  className="w-1/3 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select existing...
                  </option>
                  {availableCategories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    onKeyDown={handleManualCategoryKeyDown}
                    className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Or type new category..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCategoryClick}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.categories && formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => removeCategory(index)}
                        className="hover:text-primary/70 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Tags
              </label>
              <div className="flex gap-2">
                <select
                  onChange={handleSelectTag}
                  className="w-1/3 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select existing...
                  </option>
                  {availableTags.map((tag) => (
                    <option key={tag.id} value={tag.name}>
                      {tag.name}
                    </option>
                  ))}
                </select>

                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={manualTag}
                    onChange={(e) => setManualTag(e.target.value)}
                    onKeyDown={handleManualTagKeyDown}
                    className="flex-1 px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Or type new tag..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddTagClick}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/50 text-secondary-foreground rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="hover:opacity-70 ml-1 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 text-primary border-border rounded focus:ring-2 focus:ring-primary"
              />
              <label
                htmlFor="published"
                className="text-sm font-medium text-foreground cursor-pointer"
              >
                Publish immediately
              </label>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-md">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-6 text-base font-semibold"
              >
                {postId
                  ? "UpdatePost"
                  : isLoading
                    ? "Creating..."
                    : "Create Post"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
                className="px-8 py-6 text-base"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}